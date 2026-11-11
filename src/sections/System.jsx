import { motion } from 'framer-motion'
import { Reveal, softSpring, VIEWPORT } from '../lib/motion.jsx'

const MODS = [['Discovery intake', 'What we learned'], ['Pipeline', 'Where each client is'], ['Delivery', "What's shipping"], ['Case studies', 'What it changed']]

export default function System() {
  return (
    <section id="system">
      <div className="wrap system">
        <div>
          <Reveal as="p" className="eyebrow">Proof in practice</Reveal>
          <Reveal as="h2" delay={0.06} blur>We run Tezi the way we'd run yours.</Reveal>
          <Reveal as="p" className="lede" delay={0.12} style={{ marginLeft: 0 }}>Four modules feed one client record, from the first call to the retainer.</Reveal>
          <Reveal as="a" className="text-link" href="#how" delay={0.18}>See how an engagement runs</Reveal>
        </div>
        <motion.div className="modules" initial="hidden" whileInView="show" viewport={VIEWPORT} variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
          {MODS.map(([h, s], i) => (
            <motion.div key={h} className="mod" whileHover={{ y: -4 }}
              variants={{ hidden: { opacity: 0, x: i % 2 ? 30 : -30, y: i < 2 ? -20 : 20 }, show: { opacity: 1, x: 0, y: 0, transition: softSpring } }}>
              {h}<small>{s}</small>
            </motion.div>
          ))}
          <motion.div className="hub" variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1, transition: { ...softSpring, delay: 0.2 } } }}>
            <span className="hubdot" aria-hidden="true" />One client record
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
