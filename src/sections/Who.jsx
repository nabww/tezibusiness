import { motion } from 'framer-motion'
import { Reveal, softSpring } from '../lib/motion.jsx'
import { ICONS } from '../lib/icons.jsx'

const CARDS = [
  ['retail', 'Retail', 'From one counter to many branches, with stock, sales and staff in one place.'],
  ['wholesale', 'Wholesale', 'Bulk orders, credit accounts and invoicing that keep up with volume.'],
  ['logistics', 'Logistics', 'Transfers, deliveries and stock in transit, tracked from origin to shelf.'],
]

export default function Who() {
  return (
    <section className="alt" id="who">
      <div className="wrap center">
        <Reveal as="p" className="eyebrow">Who we serve</Reveal>
        <Reveal as="h2" delay={0.06} blur>Built for businesses that move stock.</Reveal>
        <Reveal as="p" className="lede" delay={0.12}>Inventory, multiple locations, stock movement, reconciliation. Three industries, built on the same foundations.</Reveal>
        <div className="grid3">
          {CARDS.map(([k, h, p], i) => (
            <Reveal key={k} className="card" delay={i * 0.08} whileHover={{ y: -6, transition: softSpring }}>
              <motion.div className="icon" aria-hidden="true" whileHover={{ rotate: -8, scale: 1.08 }} transition={softSpring}>{ICONS[k]}</motion.div>
              <h3>{h}</h3><p>{p}</p>
            </Reveal>
          ))}
        </div>
        <Reveal as="p" className="note"><b>Growth first:</b> more volume, more customers, more branches. Accounting comes with it. It's never the headline, and it's always in the build.</Reveal>
      </div>
    </section>
  )
}
