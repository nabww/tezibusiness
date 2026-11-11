import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Magnetic, Reveal, softSpring, spring } from '../lib/motion.jsx'

const POS = ['Fast, secure sales processing', 'Multi-branch and multi-user', 'Live inventory with reorder alerts', 'Daily shift reports: cash, card and account sales', 'Sell in-store, on the go or online']
const CARE = ['Centralised patient records and history', 'Billing, pharmacy and lab in one flow', 'Doctor station, inpatient and bed management', 'Insurance claims and discharge summaries', 'Real-time reporting, works on any device']
const JOURNEY = ['Reception', 'Registration', 'Doctor station', 'Lab', 'Pharmacy', 'Billing', 'Insurance', 'Inpatient']
const COMPARE = [
  ['Ready-made modules, set up for you', 'Built around how you actually run'],
  ['Up and running quickly', 'Paid discovery first, then a scoped build'],
  ['Proven across many businesses', 'Shaped to your niche, alongside you'],
]

function Ticks({ items }) {
  return (
    <motion.ul className="ticks" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}
      variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}>
      {items.map((t) => (
        <motion.li key={t} variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0, transition: spring } }}>
          <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="9" /><path d="M6 10.5l2.6 2.6L14 7.6" /></svg>{t}
        </motion.li>
      ))}
    </motion.ul>
  )
}

function Phone() {
  const chips = ['Shift report ready', 'Low stock: reorder', '3 branches synced']
  return (
    <div className="phone-wrap" aria-hidden="true">
      <motion.div className="phone" initial={{ y: 40, rotate: -4, opacity: 0 }} whileInView={{ y: 0, rotate: -4, opacity: 1 }} viewport={{ once: true }} transition={{ ...spring, delay: 0.1 }}
        whileHover={{ rotate: 0, y: -6 }}>
        <img src="/work/tezipos-mobile.webp" alt="" loading="lazy" draggable="false" />
      </motion.div>
      {chips.map((t, i) => (
        <motion.span key={t} className={`chip-float c${i + 1}`}
          initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          transition={{ ...softSpring, delay: 0.5 + i * 0.15 }}>
          <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 3.2 + i * 0.6, repeat: Infinity, ease: 'easeInOut' }}>{t}</motion.span>
        </motion.span>
      ))}
    </div>
  )
}

function Journey() {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.4 })
  const reduce = useReducedMotion()
  const [step, setStep] = useState(0)
  useEffect(() => {
    if (!inView || reduce) return
    const id = setInterval(() => setStep((s) => (s + 1) % 6), 1400)
    return () => clearInterval(id)
  }, [inView, reduce])
  return (
    <div className="journey-care" ref={ref} aria-hidden="true">
      <div className="jc-head"><span className="jc-dot" />Patient visit · live</div>
      <div className="jc-grid">
        {JOURNEY.map((m, i) => (
          <div key={m} className={`jc-mod${i === step ? ' on' : ''}${i < step ? ' past' : ''}`}>
            {i === step && <motion.span layoutId="jc-pill" className="jc-pill" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />}
            <span className="jc-n">{String(i + 1).padStart(2, '0')}</span><span className="jc-l">{m}</span>
          </div>
        ))}
      </div>
      <div className="jc-rec"><b>One patient record</b><span>Every desk sees only what it needs; the doctor sees the full history.</span></div>
    </div>
  )
}

function Product({ name, logo, kind, title, items, visual, more, delay }) {
  return (
    <Reveal className="product" delay={delay} whileHover={{ y: -6 }}>
      <div className="p-top">
        <span className="p-logo">{logo}</span>
        <span className="p-kind">{kind}</span>
      </div>
      <h3>{title}</h3>
      <div className="p-visual">{visual}</div>
      <Ticks items={items} />
      <div className="p-cta">
        <Magnetic className="btn btn-secondary" href="#book" strength={0.2}>Book a discovery call</Magnetic>
        <a className="text-link" href={more} target="_blank" rel="noopener">More about {name}</a>
      </div>
    </Reveal>
  )
}

export default function Products() {
  return (
    <section className="alt products" id="products" aria-labelledby="products-title">
      <div className="wrap">
        <div className="center">
          <Reveal as="p" className="eyebrow">Off the shelf</Reveal>
          <Reveal as="h2" id="products-title" delay={0.06} blur>Need something quick?</Reveal>
          <Reveal as="p" className="lede" delay={0.12}>Not every business needs a custom build on day one. Our ready-made systems get you running quickly, and they're the same proven building blocks we use in our custom work.</Reveal>
        </div>
        <div className="product-grid">
          <Product name="TeziPOS" logo={<>tezi<span>pos</span></>} kind="Point of sale · Cloud &amp; mobile" title="Sell smarter and keep stock under control, from one shop to many."
            items={POS} visual={<Phone />} more="https://tezi.co.ke/tezipos/" delay={0} />
          <Product name="Tezicare" logo={<>tezi<span>care</span></>} kind="Hospital management system" title="Patient records, billing, pharmacy and lab, without the paperwork."
            items={CARE} visual={<Journey />} more="https://tezi.co.ke/tezicare/" delay={0.1} />
        </div>
        <Reveal className="compare">
          <div className="cmp-h"><span>Off the shelf</span><span className="c">Custom with Tezi</span></div>
          {COMPARE.map(([a, b], i) => (
            <motion.div key={a} className="cmp-row" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...spring, delay: 0.1 + i * 0.08 }}>
              <span>{a}</span><span className="c">{b}</span>
            </motion.div>
          ))}
          <p className="cmp-foot">Start off the shelf and grow into custom when you're ready. Not sure which fits? That's what the discovery call is for.</p>
        </Reveal>
      </div>
    </section>
  )
}
