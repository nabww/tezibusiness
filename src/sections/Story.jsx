import { Reveal, softSpring } from '../lib/motion.jsx'

const TL = [
  ['2019', 'Depikt Studio', 'A small web design studio building websites for local businesses.'],
  ['Rebrand', 'Tezi', 'We rebranded and broadened into off-the-shelf products: websites, TeziPOS for retail and Tezicare for hospitals.'],
  ['Today', 'Custom, up close', 'We focus on specific kinds of business, work alongside each one, and build the system around how it really runs. We grow as our clients grow.'],
]

export default function Story() {
  return (
    <section className="alt" id="story">
      <div className="wrap">
        <div className="center">
          <Reveal as="p" className="eyebrow">Our story</Reveal>
          <Reveal as="h2" delay={0.06} blur>From studio to systems partner.</Reveal>
          <Reveal as="p" className="lede" delay={0.12}>We started out designing websites. Today we build the systems businesses run on, and we get close enough to each one to build it the way we'd build our own.</Reveal>
        </div>
        <ol className="timeline">
          {TL.map(([yr, h, p], i) => (
            <Reveal as="li" key={h} className={i === 2 ? 'now' : undefined} delay={i * 0.12} whileHover={{ y: -6, transition: softSpring }}>
              <span className="yr">{i === 2 && <span className="nowdot" aria-hidden="true" />}{yr}</span><h3>{h}</h3><p>{p}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal className="earlier">
          <p>Tezicare and TeziPOS are still going strong, now as the building blocks behind our custom work. <a className="text-link" href="#work">See the work</a></p>
        </Reveal>
      </div>
    </section>
  )
}
