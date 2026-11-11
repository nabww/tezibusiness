import { useRef } from 'react'
import { motion } from 'framer-motion'
import { DRAW_EASE, EASE, Reveal, spring, VIEWPORT } from '../lib/motion.jsx'
import { ICONS } from '../lib/icons.jsx'
import { useRail } from './Process.jsx'

const ST = [
  ['call', 'Step 1', 'Free intro call', 'A fit check and your top pain points. No proposal yet.', ['30–45 min', 'Virtual'], 'Free', true],
  ['disc', 'Step 2', 'Paid discovery', 'A deep dive into how you run: full intake, a findings document and a scoped proposal.', ['Virtual or in person', 'Findings doc'], 'Credited toward the build'],
  ['build', 'Step 3', 'Build', 'Locked scope and clear milestones. Changes are scoped and billed, never slipped in.', ['Locked scope', 'Milestones'], 'Fixed scope'],
  ['loop', 'Step 4', 'Retainer', 'Ongoing support, improvements and a regular read of your numbers as the business grows.', ['Support', 'Monthly insights review'], 'Monthly'],
]

export default function How() {
  const ref = useRef(null)
  const rail = useRail(ref)
  return (
    <section id="how">
      <div className="wrap">
        <div className="center">
          <Reveal as="p" className="eyebrow">How we work</Reveal>
          <Reveal as="h2" delay={0.06} blur>Clear steps. No surprises.</Reveal>
        </div>
        <motion.div className="flow" ref={ref} initial="hidden" whileInView="show" viewport={VIEWPORT}>
          <div className="credit" aria-hidden="true">
            <svg viewBox="0 0 200 48" preserveAspectRatio="none">
              <defs><mask id="arcmask"><motion.path d="M4 46 C 40 2, 160 2, 196 46" stroke="#fff" strokeWidth="6" fill="none"
                variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 1.3, ease: DRAW_EASE, delay: 0.9 } } }} /></mask></defs>
              <path d="M4 46 C 40 2, 160 2, 196 46" className="arcpath" mask="url(#arcmask)" vectorEffect="non-scaling-stroke" />
            </svg>
            <motion.i className="arrow" variants={{ hidden: { opacity: 0, y: -6 }, show: { opacity: 1, y: 0, transition: { ...spring, delay: 2.1 } } }} />
            <motion.span className="lbl" variants={{ hidden: { opacity: 0, y: 10, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 16, delay: 1.5 } } }}>Discovery fee credited to the build</motion.span>
          </div>
          <div className="rail" aria-hidden="true"><motion.span className="fill" style={rail} /></div>
          <ol className="stations">
            {ST.map(([ic, m, t, p, chips, price, start], i) => (
              <motion.li key={t} className="station"
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { y: { ...spring, delay: 0.1 + i * 0.12 }, opacity: { duration: 0.7, ease: EASE, delay: 0.1 + i * 0.12 } } } }}>
                <motion.div className={`badge${ic === 'loop' ? ' loop' : ''}`} aria-hidden="true"
                  variants={{ hidden: { scale: 0.4, rotate: -20 }, show: { scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 260, damping: 14, delay: 0.25 + i * 0.15 } } }}
                  whileHover={{ scale: 1.1, rotate: 6 }}>
                  {ICONS[ic]}
                </motion.div>
                <motion.div className="body" whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
                  <span className="meta">{m}{start && <span className="start">Start here</span>}</span>
                  <h3>{t}</h3>
                  <p>{p}</p>
                  <ul className="chips">{chips.map((c) => <li key={c}>{c}</li>)}</ul>
                  <span className="price">{price}</span>
                </motion.div>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  )
}
