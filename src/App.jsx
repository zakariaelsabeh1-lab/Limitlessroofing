import Contact from './components/Contact'
import Curtain from './components/Curtain'
import Cursor from './components/Cursor'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Nav from './components/Nav'
import Services from './components/Services'
import StickyCallBar from './components/StickyCallBar'
import Testimonials from './components/Testimonials'
import Warranty from './components/Warranty'
import WhyUs from './components/WhyUs'
import Work from './components/Work'
import { SHOW_TESTIMONIALS } from './data'

export default function App() {
  return (
    <>
      <Curtain />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <WhyUs />
        <Work />
        <Warranty />
        {SHOW_TESTIMONIALS && <Testimonials />}
        <Contact />
      </main>
      <Footer />
      <StickyCallBar />
    </>
  )
}
