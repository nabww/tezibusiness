import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Fragment, useRef } from 'react'
import { EASE, Magnetic, Reveal, spring, DRAW_EASE } from '../lib/motion.jsx'

const WORDS = 'We run on the same system we build for you.'.split(' ')
const STRIP = [['01', 'Discover', 'Learn how you run'], ['02', 'Build', 'Shaped to your operation'], ['03', 'Grow', 'Guided by AI insights'], ['04', 'Support', 'Retainer, always improving']]

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yText = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0.2])
  const gx = useSpring(useMotionValue(50), { stiffness: 40, damping: 18 })
  const gy = useSpring(useMotionValue(30), { stiffness: 40, damping: 18 })
  const bg = useTransform([gx, gy], ([x, y]) => `radial-gradient(600px circle at ${x}% ${y}%, rgba(49,88,124,.13), transparent 60%)`)
  const onMove = (e) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    gx.set(((e.clientX - r.left) / r.width) * 100)
    gy.set(((e.clientY - r.top) / r.height) * 100)
  }

  return (
    <section className="hero" id="top" ref={ref} onPointerMove={onMove}>
      <motion.div className="hero-glow" style={{ background: bg }} aria-hidden="true" />
      <motion.div className="wrap" style={{ y: yText, opacity: fade }}>
        <Reveal as="p" className="eyebrow">Consultative software for retail, wholesale &amp; logistics</Reveal>
        <h1 aria-label="We run on the same system we build for you.">
          {WORDS.map((w, i) => (
            <Fragment key={i}><span className="word" aria-hidden="true">
              <motion.span
                initial={{ y: '110%', opacity: 0, filter: 'blur(8px)' }}
                animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                transition={{ y: { ...spring, delay: 0.15 + i * 0.07 }, opacity: { duration: 0.6, delay: 0.15 + i * 0.07 }, filter: { duration: 0.8, delay: 0.15 + i * 0.07 } }}
                className={w === 'same' || w === 'system' ? 'hlw' : undefined}
              >
                {w}
              </motion.span>
            </span>{' '}</Fragment>
          ))}
          <svg className="scribble" viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true">
            <motion.path d="M4 14 C 70 4, 150 4, 296 10" fill="none" stroke="#31587c" strokeWidth="4" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, ease: DRAW_EASE, delay: 1.05 }} />
          </svg>
        </h1>
        <Reveal as="p" className="lede" delay={0.55}>We sit down with your business, learn how it actually runs, and build the system around it, the way we'd build our own. Then we help you read what the data is telling you.</Reveal>
        <Reveal className="ctas" delay={0.7}>
          <Magnetic className="btn btn-primary" href="#book">Book a discovery call</Magnetic>
          <Magnetic className="btn btn-secondary" href="#case" strength={0.2}>See the case study</Magnetic>
        </Reveal>
        <ol className="strip" aria-label="Our process">
          {STRIP.map(([k, b, s], i) => (
            <motion.li key={k} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ y: { ...spring, delay: 0.9 + i * 0.08 }, opacity: { duration: 0.6, ease: EASE, delay: 0.9 + i * 0.08 } }}
              whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 18 } }}>
              <span className="k">{k}</span><b>{b}</b><span>{s}</span>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </section>
  )
}
