import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { CountUp, EASE, Magnetic, Reveal, spring, VIEWPORT } from '../lib/motion.jsx'

const SPECS = [
  ['Payments', 'M-Pesa STK push via Daraja, confirmed at the till'],
  ['Loyalty', 'Points earned and redeemed on every sale'],
  ['Butchery', 'Shared stock pools from live slaughter'],
  ['Gas', 'Cylinders tracked by brand and weight'],
  ['Reports', 'Sales, stock, cost of goods and overdue accounts in one view'],
  ['Resilience', 'Sells offline, syncs when the connection returns'],
]

export default function Case() {
  const vref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: vref, offset: ['start end', 'center center'] })
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.88, 1])
  const radius = useTransform(scrollYProgress, [0, 1], [reduce ? 4 : 32, 4])
  const gridY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -40, 0])

  return (
    <section className="chapter" id="case" aria-labelledby="case-title">
      <div className="wrap">
        <Reveal as="span" className="tag">Flagship case study</Reveal>
        <Reveal as="h2" id="case-title" delay={0.06} blur>One till.<br />Two businesses.</Reveal>
        <Reveal as="p" className="lede" delay={0.12}>A butchery and a gas-refill business run from a single point of sale, with loyalty points on every sale and M-Pesa payments through Safaricom's Daraja API.</Reveal>

        {/* VIDEO SLOT: replace with a YouTube/Vimeo embed once client consent is recorded */}
        <motion.div ref={vref} className="video" role="img" aria-label="Video placeholder: client testimonial" style={{ scale, borderRadius: radius }}>
          <motion.span className="video-grid" style={{ y: gridY }} aria-hidden="true" />
          <span className="corner tl">Case file 001</span>
          <Magnetic className="play" strength={0.35} href="#case" aria-label="Play testimonial (coming soon)" onClick={(e) => e.preventDefault()}>
            {!reduce && [0, 1].map((i) => (
              <motion.span key={i} className="ring" aria-hidden="true" animate={{ scale: [1, 1.9], opacity: [0.45, 0] }} transition={{ duration: 2.4, repeat: Infinity, delay: i * 1.2, ease: 'easeOut' }} />
            ))}
            <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="#111114" /></svg>
          </Magnetic>
          <span className="corner bl">Client testimonial</span>
          <span className="corner br">Butchery + gas</span>
        </motion.div>

        <div className="metrics">
          {[[1, 'Till for both businesses'], [2, 'Business lines'], [3, 'Payment methods: cash, M-Pesa, account']].map(([v, l], i) => (
            <Reveal key={l} className="metric" delay={i * 0.08}><div className="v"><CountUp to={v} duration={1.2} delay={0.2 + i * 0.1} /></div><div className="l">{l}</div></Reveal>
          ))}
          <Reveal className="metric pending" delay={0.24}><div className="v">XX%</div><div className="l">Less time reconciling</div></Reveal>
        </div>
        <p className="fine">XX = placeholder until the client signs off on real numbers</p>

        <motion.div className="specs" initial="hidden" whileInView="show" viewport={VIEWPORT} variants={{ show: { transition: { staggerChildren: 0.07 } } }}>
          {SPECS.map(([b, s]) => (
            <motion.div key={b} className="spec" variants={{ hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0, transition: { x: spring, opacity: { duration: 0.6, ease: EASE } } } }}>
              <b>{b}</b><span>{s}</span>
            </motion.div>
          ))}
        </motion.div>

        <Reveal as="p" className="origin">This is where Tezi started. <span>We understood one business well enough to solve a problem nobody else would take on.</span></Reveal>
      </div>
    </section>
  )
}
