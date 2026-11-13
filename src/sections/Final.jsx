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
  const base = window.location.pathname === '/' ? '' : '/'
  return (
    <footer>
      <div className="wrap">
        <span>&copy; 2026 Tezi. Tezicare and TeziPOS are the accelerators we build on.</span>
        <nav aria-label="Footer">
          <a href={`${base}#process`}>Process</a><a href={`${base}#case`}>Case study</a><a href={`${base}#insights`}>Insights</a><a href={`${base}#work`}>Work</a><a href={`${base}#products`}>Products</a><a href={`${base}#story`}>Our story</a><a href={`${base}#how`}>How we work</a><a href={`${base}#book`}>Book a discovery call</a>
        </nav>
      </div>
    </footer>
  )
}
