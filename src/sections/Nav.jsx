import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Magnetic } from '../lib/motion.jsx'

const LINKS = [
  ['process', 'Process'], ['case', 'Case study'], ['insights', 'Insights'],
  ['work', 'Work'], ['products', 'Products'], ['story', 'Our story'], ['how', 'How we work'],
]

export default function Nav() {
  const [active, setActive] = useState(null)
  const [hover, setHover] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const base = window.location.pathname === '/' ? '' : '/'
  useMotionValueEvent(scrollY, 'change', (v) => {
    setScrolled(v > 12)
    const first = document.getElementById(LINKS[0][0])
    if (first && v + window.innerHeight * 0.5 < first.offsetTop) setActive(null)
  })

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    const els = LINKS.map(([id]) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const pill = hover ?? active
  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="wrap">
        <a className="logo" href={base ? '/' : '#top'} aria-label="Tezi home"><img src="/tezi-logo.png" alt="Tezi" width="478" height="294" /></a>
        <nav aria-label="Primary">
          <ul onPointerLeave={() => setHover(null)}>
            {LINKS.map(([id, label]) => (
              <li key={id}>
                <a href={`${base}#${id}`} className={active === id ? 'on' : undefined} aria-current={active === id ? 'true' : undefined} onPointerEnter={() => setHover(id)}>
                  {pill === id && <motion.span layoutId="navpill" className="navpill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                  <span className="lbl">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav-end">
          <Magnetic className="btn btn-primary btn-sm" href={`${base}#book`} strength={0.2}>Book a discovery call</Magnetic>
          <button type="button" className="menu-btn" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav id="mobile-menu" className="mobile-menu" aria-label="Mobile" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
            <ul>
              {LINKS.map(([id, label]) => (
                <li key={id}><a href={`${base}#${id}`} className={active === id ? 'on' : undefined} onClick={() => setOpen(false)}>{label}</a></li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
