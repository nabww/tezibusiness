import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { EASE, Reveal, draw, spring, useMedia, VIEWPORT } from '../lib/motion.jsx'

const P = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
const D = (d, delay, acc, w) => (
  <motion.path d={d} variants={draw(delay)} className={acc ? 'acc' : undefined} strokeWidth={w} />
)
const bar = (delay) => ({ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { ...spring, delay } } })
const layer = (delay) => ({ hidden: { opacity: 0, y: -16 }, show: { opacity: 1, y: 0, transition: { ...spring, delay } } })
const fadeIn = (delay) => ({ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.8, delay } } })

const ART = {
  discover: (
    <svg viewBox="0 0 120 120" {...P}>
      {D('M14 46 L22 30 H74 L82 46 Z', 0.2)}{D('M18 46 V92 H78 V46', 0.35)}{D('M40 92 V70 H56 V92', 0.5)}{D('M26 56 H34 M26 62 H31', 0.6)}
      <motion.circle className="lens" cx="80" cy="72" r="19" stroke="none" variants={fadeIn(0.7)} />
      <motion.circle className="acc" cx="80" cy="72" r="19" variants={draw(0.7)} />
      {D('M94 86 L106 98', 0.9, true, 4)}{D('M72 80 V74 M78 80 V68 M84 80 V71 M89 80 V65', 1.0, true)}
    </svg>
  ),
  build: (
    <svg viewBox="0 0 120 120" {...P}>
      <motion.g variants={layer(0.7)}>{D('M20 74 L60 94 L100 74', 0.7)}</motion.g>
      <motion.g variants={layer(0.45)}>{D('M20 58 L60 78 L100 58', 0.45)}</motion.g>
      <motion.g variants={layer(0.2)}>
        <path className="soft" d="M60 22 L100 42 L60 62 L20 42 Z" />
        {D('M60 22 L100 42 L60 62 L20 42 Z', 0.2, true)}{D('M53 37 L47 42 L53 47 M67 37 L73 42 L67 47', 0.6, true)}
      </motion.g>
    </svg>
  ),
  grow: (
    <svg viewBox="0 0 120 120" {...P}>
      {D('M14 98 H106', 0.2)}
      {[[22, 80, 18], [44, 68, 30], [66, 54, 44], [88, 38, 60]].map(([x, y, h], i) => (
        <motion.rect key={x} className={`gbar${i === 3 ? ' hot' : ''}`} x={x} y={y} width="14" height={h} rx="2" variants={bar(0.4 + i * 0.12)} style={{ originY: 1 }} />
      ))}
      {D('M18 66 L42 52 L62 58 L98 22', 0.8, true)}{D('M86 22 H98 V34', 1.3, true)}
    </svg>
  ),
  support: (
    <svg viewBox="0 0 120 120" {...P}>
      <g className="spin">{D('M96 60 A36 36 0 1 1 85.5 34.5', 0.2)}{D('M75.5 34.5 H85.5 V24.5', 0.9)}</g>
      <motion.path className="soft" d="M60 40 L76 46 V60 C76 72 69 79 60 83 C51 79 44 72 44 60 V46 Z" variants={fadeIn(0.6)} />
      {D('M60 40 L76 46 V60 C76 72 69 79 60 83 C51 79 44 72 44 60 V46 Z', 0.4, true)}{D('M53 61 L58 66 L68 56', 1.0, true)}
    </svg>
  ),
}

const STEPS = [
  ['discover', '01', 'Discover', 'We learn how your business actually runs: the counter, the stock room, the books.', 'Findings + scoped proposal'],
  ['build', '02', 'Build', 'A system shaped around your operation, with locked scope and no surprises.', 'Your system, live'],
  ['grow', '03', 'Grow', 'More volume, customers and branches, guided by dashboards and AI suggestions drawn from your own data.', 'Insights that guide growth'],
  ['support', '04', 'Support', 'A retainer keeps it running, improving and in step with the business.', 'Always improving'],
]

export function useRail(ref) {
  const desktop = useMedia('(min-width:880px)')
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] })
  const p = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), { stiffness: 90, damping: 24 })
  return desktop ? { scaleX: p, scaleY: 1 } : { scaleY: p, scaleX: 1 }
}

export default function Process() {
  const ref = useRef(null)
  const rail = useRail(ref)
  return (
    <section id="process">
      <div className="wrap">
        <div className="center">
          <Reveal as="p" className="eyebrow">The process</Reveal>
          <Reveal as="h2" delay={0.06} blur>Discover. Build. Grow. Support.</Reveal>
        </div>
        <div className="journey" ref={ref}>
          <div className="rail" aria-hidden="true"><motion.span className="fill" style={rail} /></div>
          <ol className="jsteps">
            {STEPS.map(([k, n, t, p, o], i) => (
              <motion.li key={k} className="jstep" initial="hidden" whileInView="show" viewport={VIEWPORT}
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { y: { ...spring, delay: i * 0.12 }, opacity: { duration: 0.7, ease: EASE, delay: i * 0.12 } } } }}>
                <motion.div className="art" aria-hidden="true" whileHover={{ y: -8, rotate: -2, scale: 1.04 }} transition={{ type: 'spring', stiffness: 260, damping: 16 }}>
                  {ART[k]}
                </motion.div>
                <span className="n">{n}</span>
                <h3>{t}</h3>
                <p>{p}</p>
                <span className="out">{o}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
