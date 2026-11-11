import { Magnetic, Reveal } from '../lib/motion.jsx'

export function Final() {
  return (
    <section className="final center alt" id="book">
      <div className="wrap">
        <Reveal as="h2" blur>Tell us how your business runs.</Reveal>
        <Reveal as="p" className="lede" delay={0.08}>Start with a free 30–45 minute call. No proposal and no pressure, just a fit check.</Reveal>
        <Reveal className="ctas" delay={0.16}>
          {/* Wire href to the booking link (Calendly, Cal.com, etc.) */}
          <Magnetic className="btn btn-primary" href="#book" strength={0.4}>Book a discovery call</Magnetic>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <span>&copy; 2026 Tezi, formerly Depikt Studio. Tezicare and TeziPOS are the accelerators we build on.</span>
        <nav aria-label="Footer">
          <a href="#process">Process</a><a href="#case">Case study</a><a href="#insights">Insights</a><a href="#work">Work</a><a href="#products">Products</a><a href="#story">Our story</a><a href="#how">How we work</a><a href="#book">Book a discovery call</a>
        </nav>
      </div>
    </footer>
  )
}
