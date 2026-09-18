import { useEffect } from 'react'
import * as THREE from 'three'

// Cinematic wireframe roof: trusses draw in, shingles tile across,
// then the finished roof rotates with mouse parallax and drifting particles.
export function useRoofScene(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 640px)').matches

    const GREEN = 0x3bdb1e
    const GREEN_GLOW = 0x5bf622
    const GREEN_DEEP = 0x0d740c

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x060906, 0.028)

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    const camBase = new THREE.Vector3(0.4, 2.4, 13)
    camera.position.copy(camBase)
    camera.lookAt(0, 1.4, 0)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5))

    // lights (green-tinted, cinematic)
    scene.add(new THREE.AmbientLight(0x1a3a12, 0.9))
    const key = new THREE.DirectionalLight(GREEN_GLOW, 1.4)
    key.position.set(5, 8, 6)
    scene.add(key)
    const rim = new THREE.DirectionalLight(0x2b6a1f, 1.1)
    rim.position.set(-7, 3, -5)
    scene.add(rim)

    const group = new THREE.Group()
    scene.add(group)

    // ---- roof geometry parameters ----
    const W = 5.4 // half length along X (ridge)
    const H = 2.5 // ridge height above eave
    const D = 3.4 // depth of each slope (Z)
    const ridgeY = H
    const eaveY = 0

    // ---- structural beams (each draws in over time) ----
    const beams = []
    const beamMat = () =>
      new THREE.LineBasicMaterial({ color: GREEN, transparent: true, opacity: 0 })

    function addBeam(ax, ay, az, bx, by, bz, start) {
      const a = new THREE.Vector3(ax, ay, az)
      const b = new THREE.Vector3(bx, by, bz)
      const geom = new THREE.BufferGeometry()
      const pos = new Float32Array([a.x, a.y, a.z, a.x, a.y, a.z])
      geom.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      const mat = beamMat()
      const line = new THREE.Line(geom, mat)
      group.add(line)
      beams.push({ a, b, geom, mat, start, dur: 0.5 })
    }

    let t0 = 0
    // ridge line first
    addBeam(-W, ridgeY, 0, W, ridgeY, 0, (t0 += 0))
    t0 += 0.35
    // eaves
    addBeam(-W, eaveY, D, W, eaveY, D, t0)
    addBeam(-W, eaveY, -D, W, eaveY, -D, t0)
    t0 += 0.3
    // rafters along the ridge (front + back), staggered
    const cols = 9
    for (let i = 0; i <= cols; i++) {
      const x = -W + (2 * W * i) / cols
      const s = t0 + i * 0.06
      addBeam(x, ridgeY, 0, x, eaveY, D, s) // front rafter
      addBeam(x, ridgeY, 0, x, eaveY, -D, s + 0.03) // back rafter
    }
    t0 += cols * 0.06 + 0.4
    // purlins running along the slope (both planes), a few rows
    const rows = 3
    for (let r = 1; r <= rows; r++) {
      const f = r / (rows + 1)
      const y = ridgeY + (eaveY - ridgeY) * f
      const z = 0 + (D - 0) * f
      const s = t0 + r * 0.12
      addBeam(-W, y, z, W, y, z, s)
      addBeam(-W, y, -z, W, y, -z, s + 0.05)
    }
    t0 += rows * 0.12 + 0.3
    // gable end triangles
    for (const ex of [-W, W]) {
      addBeam(ex, ridgeY, 0, ex, eaveY, D, t0)
      addBeam(ex, ridgeY, 0, ex, eaveY, -D, t0)
      addBeam(ex, eaveY, D, ex, eaveY, -D, t0 + 0.1)
    }
    const frameEnd = t0 + 0.6

    // ---- shingles (InstancedMesh, tile across the two planes) ----
    const shCols = isMobile ? 12 : 20
    const shRows = isMobile ? 5 : 7
    const count = shCols * shRows * 2 // two planes
    const shGeo = new THREE.BoxGeometry(1, 0.16, 1)
    const shMat = new THREE.MeshStandardMaterial({
      color: 0x0c3a08,
      emissive: GREEN_DEEP,
      emissiveIntensity: 0.35,
      metalness: 0.35,
      roughness: 0.55,
      transparent: true,
      opacity: 0.92,
    })
    const shingles = new THREE.InstancedMesh(shGeo, shMat, count)
    shingles.frustumCulled = false
    group.add(shingles)

    const inst = [] // { basis: Matrix4, delay }
    const dummy = new THREE.Object3D()
    const tmpM = new THREE.Matrix4()
    const xDir = new THREE.Vector3(1, 0, 0)

    function buildPlane(sign) {
      // ridge->eave slope vector for this plane
      const slope = new THREE.Vector3(0, eaveY - ridgeY, sign * D)
      const slopeLen = slope.length()
      const slopeU = slope.clone().normalize()
      const normal = new THREE.Vector3().crossVectors(xDir, slopeU).normalize()
      if (normal.y < 0) normal.negate()
      const basis3 = new THREE.Matrix4().makeBasis(xDir, slopeU, normal)
      const cellX = (2 * W) / shCols
      const cellV = slopeLen / shRows
      for (let c = 0; c < shCols; c++) {
        for (let r = 0; r < shRows; r++) {
          const x = -W + cellX * (c + 0.5)
          const v = cellV * (r + 0.5)
          const p = new THREE.Vector3(0, ridgeY, 0)
            .add(slopeU.clone().multiplyScalar(v))
          p.x = x
          const basis = basis3.clone()
          basis.setPosition(p)
          // scale to fill the cell (slightly overlap), then flatten
          const sc = new THREE.Matrix4().makeScale(cellX * 1.02, 1, cellV * 1.04)
          basis.multiply(sc)
          const delay = frameEnd - 0.4 + (r / shRows) * 1.4 + Math.abs(x) * 0.02
          inst.push({ basis, delay })
        }
      }
    }
    buildPlane(1)
    buildPlane(-1)

    // ---- particles ----
    const pCount = isMobile ? 70 : 150
    const pGeo = new THREE.BufferGeometry()
    const pPos = new Float32Array(pCount * 3)
    const pSpeed = new Float32Array(pCount)
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 22
      pPos[i * 3 + 1] = Math.random() * 12 - 2
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 16
      pSpeed[i] = 0.12 + Math.random() * 0.35
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    const pMat = new THREE.PointsMaterial({
      color: GREEN_GLOW,
      size: isMobile ? 0.05 : 0.045,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const points = new THREE.Points(pGeo, pMat)
    scene.add(points)

    // ---- sizing ----
    function resize() {
      const w = parent.clientWidth
      const h = parent.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(parent)

    // ---- interaction ----
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
    function onMove(e) {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2
    }
    let scrollY = 0
    function onScroll() {
      scrollY = window.scrollY || 0
    }
    if (!reduced) {
      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('scroll', onScroll, { passive: true })
    }

    const ease = (x) => 1 - Math.pow(1 - THREE.MathUtils.clamp(x, 0, 1), 3)

    function setBeams(elapsed) {
      for (const bm of beams) {
        const t = ease((elapsed - bm.start) / bm.dur)
        const p = bm.geom.attributes.position.array
        p[3] = bm.a.x + (bm.b.x - bm.a.x) * t
        p[4] = bm.a.y + (bm.b.y - bm.a.y) * t
        p[5] = bm.a.z + (bm.b.z - bm.a.z) * t
        bm.geom.attributes.position.needsUpdate = true
        bm.mat.opacity = THREE.MathUtils.clamp(t * 1.4, 0, 0.9)
      }
    }
    function setShingles(elapsed) {
      for (let i = 0; i < inst.length; i++) {
        const it = inst[i]
        const s = ease((elapsed - it.delay) / 0.5)
        dummy.scale.setScalar(0.0001 + s)
        tmpM.copy(it.basis)
        // apply grow scale about instance origin
        const grow = new THREE.Matrix4().makeScale(s || 0.0001, s || 0.0001, s || 0.0001)
        tmpM.multiply(grow)
        shingles.setMatrixAt(i, tmpM)
      }
      shingles.instanceMatrix.needsUpdate = true
    }

    // ---- render loop ----
    let raf = 0
    let running = true
    let start = null
    const clock = new THREE.Clock()

    function frame(now) {
      if (!running) return
      raf = requestAnimationFrame(frame)
      if (start === null) start = now
      const elapsed = (now - start) / 1000
      const dt = Math.min(clock.getDelta(), 0.05)

      setBeams(elapsed)
      setShingles(elapsed)

      // particles drift up
      const arr = pGeo.attributes.position.array
      for (let i = 0; i < pCount; i++) {
        arr[i * 3 + 1] += pSpeed[i] * dt
        if (arr[i * 3 + 1] > 11) arr[i * 3 + 1] = -3
      }
      pGeo.attributes.position.needsUpdate = true

      // auto rotate once frame is mostly built
      const spin = THREE.MathUtils.clamp((elapsed - 2.2) / 2, 0, 1)
      group.rotation.y += 0.12 * dt * spin

      // mouse parallax
      mouse.x += (mouse.tx - mouse.x) * 0.05
      mouse.y += (mouse.ty - mouse.y) * 0.05
      group.rotation.x = mouse.y * 0.12
      group.position.x = mouse.x * 0.5

      // scroll parallax on camera
      const sc = Math.min(scrollY, 900) / 900
      camera.position.y = camBase.y + sc * 3.2
      camera.position.z = camBase.z + sc * 2.5
      camera.lookAt(0, 1.4 - sc * 0.6, 0)

      renderer.render(scene, camera)
    }

    function renderStatic() {
      setBeams(999)
      setShingles(999)
      renderer.render(scene, camera)
    }

    // pause when hero leaves viewport
    let io
    if (!reduced) {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (!running) {
              running = true
              start = null
              clock.getDelta()
              raf = requestAnimationFrame(frame)
            }
          } else {
            running = false
            cancelAnimationFrame(raf)
          }
        },
        { threshold: 0 }
      )
      io.observe(parent)
      raf = requestAnimationFrame(frame)
    } else {
      renderStatic()
    }

    return () => {
      running = false
      cancelAnimationFrame(raf)
      if (io) io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
      beams.forEach((b) => {
        b.geom.dispose()
        b.mat.dispose()
      })
      shGeo.dispose()
      shMat.dispose()
      pGeo.dispose()
      pMat.dispose()
      renderer.dispose()
    }
  }, [canvasRef])
}
