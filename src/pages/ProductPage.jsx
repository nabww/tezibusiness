import { motion } from 'framer-motion'
import { Magnetic, Reveal, softSpring, spring } from '../lib/motion.jsx'
import Nav from '../sections/Nav.jsx'
import { Footer } from '../sections/Final.jsx'
import { ScrollProgress } from '../App.jsx'

export const TEZIPOS = {
  eyebrow: 'TeziPOS · Mobile & cloud point of sale',
  title: 'Your entire business, in your pocket.',
  lede: 'TeziPOS is a mobile and cloud point of sale for sales, inventory, expenses, invoices and reports, from one shop to many. Easy to use, with room for powerful customisation.',
  strip: [
    ['01', 'Mobile POS', 'Sell from any device'],
    ['02', 'Multi-branch', 'Every shop in one view'],
    ['03', 'Live stock', 'Alerts before you run out'],
    ['04', 'Shift reports', 'Cash, card and account sales'],
  ],
  cap: {
    eyebrow: 'What it does',
    title: 'Why an online point of sale?',
    lede: 'Everything between the sale and the report, handled.',
    items: [
      ['Sell in-store & on the go', 'Take payment from any device, at any outlet. Click pay, the drawer pops open, the receipt prints.'],
      ['One view of every branch', 'Scale from one store to many in the cloud, with all your data and reports in one place.'],
      ['Inventory that\u2019s always current', 'Products, categories, prices and quantities in real time, adjusted automatically as you sell.'],
      ['Never run out of stock', 'Low-stock alerts tell you when to reorder, before the shelf goes empty.'],
      ['Total control on cash', 'Daily shift reports across every payment type: cash, card, account sales and returns.'],
      ['Measure to improve', 'A sales dashboard that shows what\u2019s selling and who\u2019s selling it.'],
    ],
  },
  mods: {
    eyebrow: 'Modules',
    title: 'Get organised. Save time. Grow bigger.',
    lede: 'Three modules, tied into one real-time system.',
    items: [
      ['Sales', 'Every transaction, from till to report, as it happens.'],
      ['Inventory', 'Stock levels adjust with every sale, across every branch.'],
      ['Operations', 'Products, prices, customers and staff under your control.'],
    ],
    hub: 'TeziPOS: one system, one source of truth',
  },
  why: {
    eyebrow: 'Why TeziPOS',
    title: 'Ready-made, but never generic.',
    items: [
      ['Set up for you', 'We configure it around how you actually run, not the other way round.'],
      ['Works anywhere', 'Phone, tablet or till. Any internet-connected device becomes your point of sale.'],
      ['Grows into custom', 'The same building blocks we use in our custom work, ready when you need more.'],
    ],
  },
  cta: ['See it running on your stock.', 'Book a free call and we\u2019ll walk you through TeziPOS on real data. Yours, if you like.'],
}

export const TEZICARE = {
  eyebrow: 'Tezicare · Hospital management system',
  title: 'Every desk sees what it needs. The doctor sees everything.',
  lede: 'Tezicare is a customisable, integrated hospital management system for clinics and hospitals. Records, billing, pharmacy and lab in one flow, with far less paperwork. And it\u2019s mobile-first, so a phone or tablet is all you need.',
  strip: [
    ['01', 'Any facility', 'Clinics to large hospitals'],
    ['02', 'Mobile-first', 'Phone or tablet, anywhere'],
    ['03', 'One record', 'Full history at every desk'],
    ['04', 'Custom fit', 'Shaped to your workflows'],
  ],
  flow: {
    eyebrow: 'The patient journey',
    title: 'One patient visit, end to end.',
    steps: ['Reception', 'Registration', 'Doctor station', 'Lab', 'Pharmacy', 'Billing', 'Insurance', 'Inpatient'],
  },
  cap: {
    eyebrow: 'Modules',
    title: 'Every desk your facility runs on.',
    lede: 'Cloud-based and modular. Take what you need and it grows with you.',
    items: [
      ['Reception & cash point', 'The entry point for arrivals and payments, or split the cashier out.'],
      ['Patient registration', 'Full patient details captured quickly, once.'],
      ['Doctor station', 'Impressions, instructions, lab and radiology requests, with the full history at every visit.'],
      ['Nurse station', 'Vitals, one-off services and billing, plus every instruction from the doctor.'],
      ['Laboratory', 'Order, deliver and bill lab services. Results flow straight back to the doctor.'],
      ['Radiology', 'Radiology services and charges, documented and linked to the patient record.'],
      ['Pharmacy', 'Dispensing for registered and outpatient clients. Deeper needs? Ask about Tezipharm.'],
      ['Billing & insurance', 'Cash collections, insurer invoicing and discharge summaries. M-PESA on request.'],
      ['Inpatient & beds', 'Bed management, rates and invoicing for individuals and insurers.'],
      ['Outpatient', 'Walk-ins, refills and routine services that don\u2019t need a doctor\u2019s sign-off.'],
      ['Inventory', 'Pharmaceutical and non-pharmaceutical stock, always accounted for.'],
      ['Admin & reports', 'User rights, cash flow, a management dashboard and up to five custom reports, plus SMS notifications.'],
    ],
    modgrid: true,
  },
  why: {
    eyebrow: 'Why a hospital system',
    title: 'Less paperwork. Better care.',
    items: [
      ['Patient data in one click', 'History, current treatment and diagnostic reports, retrieved instantly.'],
      ['Secure by design', 'Encryption and role-based access keep records private.'],
      ['Transparent operations', 'Authorised staff see what they need; records stay clear to read.'],
      ['Accurate, instant reports', 'No digging through paper. Reports are ready when you are.'],
      ['Lower running costs', 'Less manual entry, fewer errors, a lighter load on staff.'],
      ['Faster patient service', 'Complete information at once means shorter queues and better care.'],
    ],
  },
  cta: ['Bring it to your facility.', 'Book a free call and we\u2019ll walk you through Tezicare on a real patient journey.'],
}

function Grid({ items, cardClass = 'card' }) {
  return (
    <div className="grid3">
      {items.map(([h, p], i) => (
        <Reveal key={h} className={cardClass} delay={i * 0.06} whileHover={{ y: -6, transition: softSpring }}>
          <h3>{h}</h3><p>{p}</p>
        </Reveal>
      ))}
    </div>
  )
}

export default function ProductPage({ p }) {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main id="main">
        <section className="pdp-hero" id="top">
          <div className="wrap">
            <Reveal as="p" className="eyebrow">{p.eyebrow}</Reveal>
            <Reveal as="h1" delay={0.08} blur>{p.title}</Reveal>
            <Reveal as="p" className="lede" delay={0.16}>{p.lede}</Reveal>
            <Reveal className="ctas" delay={0.24}>
              <Magnetic className="btn btn-primary" href="/#book">Book a discovery call</Magnetic>
              <Magnetic className="btn btn-secondary" href="/#products" strength={0.2}>Back to products</Magnetic>
            </Reveal>
            <ol className="strip" aria-label="Highlights">
              {p.strip.map(([k, b, s], i) => (
                <motion.li key={k} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ y: { ...spring, delay: 0.4 + i * 0.08 }, opacity: { duration: 0.6, delay: 0.4 + i * 0.08 } }}
                  whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 18 } }}>
                  <span className="k">{k}</span><b>{b}</b><span>{s}</span>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {p.flow && (
          <section className="alt">
            <div className="wrap center">
              <Reveal as="p" className="eyebrow">{p.flow.eyebrow}</Reveal>
              <Reveal as="h2" delay={0.06} blur>{p.flow.title}</Reveal>
              <ol className="flowline">
                {p.flow.steps.map((s, i) => (
                  <Reveal as="li" key={s} delay={i * 0.05} y={12}><span className="fn">{String(i + 1).padStart(2, '0')}</span>{s}</Reveal>
                ))}
              </ol>
            </div>
          </section>
        )}

        <section className={p.flow ? '' : 'alt'}>
          <div className="wrap center">
            <Reveal as="p" className="eyebrow">{p.cap.eyebrow}</Reveal>
            <Reveal as="h2" delay={0.06} blur>{p.cap.title}</Reveal>
            {p.cap.lede && <Reveal as="p" className="lede" delay={0.12}>{p.cap.lede}</Reveal>}
            {p.cap.modgrid ? (
              <div className="pdp-mods">
                {p.cap.items.map(([h, s]) => (
                  <Reveal key={h} className="mod" y={14}>{h}<small>{s}</small></Reveal>
                ))}
              </div>
            ) : <Grid items={p.cap.items} />}
          </div>
        </section>

        {p.mods && (
          <section>
            <div className="wrap center">
              <Reveal as="p" className="eyebrow">{p.mods.eyebrow}</Reveal>
              <Reveal as="h2" delay={0.06} blur>{p.mods.title}</Reveal>
              {p.mods.lede && <Reveal as="p" className="lede" delay={0.12}>{p.mods.lede}</Reveal>}
              <div className="pdp-mods">
                {p.mods.items.map(([h, s]) => (
                  <Reveal key={h} className="mod" y={14}>{h}<small>{s}</small></Reveal>
                ))}
                {p.mods.hub && <Reveal className="hub" y={14} delay={0.2}><span className="hubdot" />{p.mods.hub}</Reveal>}
              </div>
            </div>
          </section>
        )}

        <section className="alt">
          <div className="wrap center">
            <Reveal as="p" className="eyebrow">{p.why.eyebrow}</Reveal>
            <Reveal as="h2" delay={0.06} blur>{p.why.title}</Reveal>
            <Grid items={p.why.items} />
          </div>
        </section>

        <section className="final center">
          <div className="wrap">
            <Reveal as="h2" blur>{p.cta[0]}</Reveal>
            <Reveal as="p" className="lede" delay={0.08}>{p.cta[1]}</Reveal>
            <Reveal className="ctas" delay={0.16}>
              <Magnetic className="btn btn-primary" href="/#book" strength={0.4}>Book a discovery call</Magnetic>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
