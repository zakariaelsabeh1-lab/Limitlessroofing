import { useInView } from '../hooks/useInView'

// Scroll-triggered fade + slide-up. `delay` in seconds staggers siblings.
export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '', style, ...rest }) {
  const [ref, inView] = useInView()
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
