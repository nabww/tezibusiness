import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

export const EASE = [0.22, 1, 0.36, 1]
export const DRAW_EASE = [0.6, 0.1, 0.2, 1]
export const spring = { type: 'spring', stiffness: 70, damping: 18, mass: 0.9 }
export const softSpring = { type: 'spring', stiffness: 260, damping: 22 }
export const VIEWPORT = { once: true, margin: '0px 0px -60px 0px' }

export function Reveal({ as = 'div', delay = 0, y = 28, blur = false, children, ...rest }) {
  const C = motion[as]
  const hidden = { opacity: 0, y, ...(blur && { filter: 'blur(10px)' }) }
  const shown = { opacity: 1, y: 0, ...(blur && { filter: 'blur(0px)' }) }
  return (
    <C
      initial={hidden}
      whileInView={shown}
      viewport={VIEWPORT}
      transition={{
        y: { ...spring, delay },
        opacity: { duration: 0.8, ease: EASE, delay },
        filter: { duration: 0.9, ease: EASE, delay },
      }}
      {...rest}
    >
      {children}
    </C>
  )
}

export function CountUp({ to, prefix = '', suffix = '', duration = 1.6, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })
  const reduce = useReducedMotion()
  useEffect(() => {
    if (!inView || !ref.current) return
    if (reduce) { ref.current.textContent = `${prefix}${to}${suffix}`; return }
    const c = animate(0, to, {
      duration, delay, ease: EASE,
      onUpdate: (v) => { if (ref.current) ref.current.textContent = `${prefix}${Math.round(v)}${suffix}` },
    })
    return () => c.stop()
  }, [inView, to, prefix, suffix, duration, delay, reduce])
  return <span ref={ref}>{`${prefix}0${suffix}`}</span>
}

export function Magnetic({ strength = 0.3, className, children, ...rest }) {
  const reduce = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 })
  const move = (e) => {
    if (reduce || e.pointerType === 'touch') return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * strength)
    y.set((e.clientY - r.top - r.height / 2) * strength)
  }
  const leave = () => { x.set(0); y.set(0) }
  return (
    <motion.a
      className={className}
      style={{ x, y }}
      onPointerMove={move}
      onPointerLeave={leave}
      whileTap={{ scale: 0.96 }}
      {...rest}
    >
      {children}
    </motion.a>
  )
}

export function useMedia(query) {
  const get = () => typeof window !== 'undefined' && window.matchMedia(query).matches
  const [m, setM] = useState(get)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setM(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return m
}

export const draw = (delay = 0, duration = 1.4) => ({
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { pathLength: { duration, ease: DRAW_EASE, delay }, opacity: { duration: 0.2, delay } } },
})
