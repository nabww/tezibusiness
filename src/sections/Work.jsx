import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Reveal, softSpring, useMedia } from '../lib/motion.jsx'

const PROJECTS = [
  { name: 'Butchery & Gas POS', kind: 'Custom system', url: 'Flagship build', href: '#case', desc: 'One till for two businesses: meat pools from live slaughter, cylinders by brand and weight, M-Pesa, loyalty, and it keeps selling offline.', tags: ['Custom', 'POS', 'M-Pesa', 'Analytics'], mock: true },
  { name: 'Agromind AI', kind: 'AgriTech platform', url: 'agromind-ai.com', href: 'https://www.agromind-ai.com/', img: '/work/agromind.webp', desc: 'A smart farming platform giving African smallholder farmers digital advisory tools and climate-smart solutions.', tags: ['AgriTech', 'Website'] },
  { name: 'Safari Yetu Adventures', kind: 'Tour company', url: 'safariyetuadventures.com', href: 'https://www.safariyetuadventures.com/', img: '/work/safari-yetu.webp', desc: 'A tour company website showcasing local and international travel packages for unforgettable adventures.', tags: ['Tourism', 'Website'] },
  { name: 'JoyBells Academy', kind: 'Private school', url: 'joybellsacademy.com', href: 'https://joybellsacademy.com', img: '/work/joybells.webp', desc: 'A private school website highlighting quality education, nurturing environments and holistic student development.', tags: ['Education', 'Website'] },
  { name: 'Careerflow Kenya', kind: 'Career platform', url: 'careerflow.co.ke', href: 'https://careerflow.co.ke/', img: '/work/careerflow.webp', desc: 'A career exploration platform that helps people discover opportunities, build skills and plan their professional growth.', tags: ['Careers', 'Platform'] },
]

function TillMock() {
  return (
    <div className="till" aria-hidden="true">
      <div className="till-tabs"><span className="on">Butchery</span><span>Gas</span></div>
      <div className="till-rows">
        <span><b>Beef · 2 kg</b><i>pool</i></span>
        <span><b>Goat · 1 kg</b><i>pool</i></span>
        <span><b>6 kg refill</b><i>brand</i></span>
      </div>
      <div className="till-foot">
        <span className="pts">+24 pts</span>
        <motion.span className="pay" animate={{ boxShadow: ['0 0 0 0 rgba(49,88,124,.35)', '0 0 0 10px rgba(49,88,124,0)'] }} transition={{ duration: 1.8, repeat: Infinity }}>Pay with M-Pesa</motion.span>
      </div>
    </div>
  )
}

function Card({ p, i }) {
  const external = p.href.startsWith('http')
  return (
    <motion.article className={`wcard${p.mock ? ' feature' : ''}`}
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }}
      transition={{ ...softSpring, stiffness: 140, delay: i * 0.06 }}
      whileHover="hover">
      <a href={p.href} {...(external && { target: '_blank', rel: 'noopener' })} aria-label={`${p.name}${external ? ' (opens in a new tab)' : ''}`}>
        <motion.div className="frame" variants={{ hover: { y: -8 } }} transition={softSpring}>
          <div className="frame-bar" aria-hidden="true"><span className="dots"><i /><i /><i /></span><span className="addr">{p.url}</span></div>
          <div className="shot">
            {p.mock ? <TillMock /> : (
              <motion.img src={p.img} alt={`${p.name} homepage`} loading="lazy" decoding="async" draggable="false"
                variants={{ hover: { scale: 1.06, y: -6 } }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} />
            )}
          </div>
        </motion.div>
        <div className="wmeta">
          <span className="wk">{p.kind}</span>
          <h3>{p.name} <motion.span className="arrow" aria-hidden="true" variants={{ hover: { x: 4, y: external ? -4 : 0 } }}>{external ? '↗' : '→'}</motion.span></h3>
          <p>{p.desc}</p>
          <ul className="tags">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      </a>
    </motion.article>
  )
}

export default function Work() {
  const reduce = useReducedMotion()
  const wide = useMedia('(min-width: 900px)')
  const pinned = wide && !reduce
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const dist = useRef(0)
  const [height, setHeight] = useState(null)
  const [idx, setIdx] = useState(1)

  useLayoutEffect(() => {
    if (!pinned) return
    const measure = () => {
      const t = trackRef.current
      const last = t.lastElementChild
      const pad = parseFloat(getComputedStyle(t).paddingLeft) || 0
      dist.current = Math.max(0, last.offsetLeft + last.offsetWidth + pad - t.clientWidth)
      setHeight(window.innerHeight + dist.current)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(trackRef.current)
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure) }
  }, [pinned])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const raw = useTransform(scrollYProgress, (v) => (pinned ? -v * dist.current : 0))
  const x = useSpring(raw, { stiffness: 140, damping: 30, mass: 0.35 })
  const bar = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  useMotionValueEvent(scrollYProgress, 'change', (v) => setIdx(Math.min(PROJECTS.length, 1 + Math.round(v * (PROJECTS.length - 1)))))

  return (
    <section className={`work${pinned ? ' pinned' : ''}`} id="work" ref={sectionRef} style={pinned && height ? { height } : undefined} aria-labelledby="work-title">
      <div className="work-sticky">
        <div className="wrap work-head">
          <div>
            <Reveal as="p" className="eyebrow">Selected work</Reveal>
            <Reveal as="h2" id="work-title" delay={0.06} blur>Built with, not just for.</Reveal>
            <Reveal as="p" className="lede" delay={0.12}>From custom business systems to the websites that started it all. Every one shaped around the people who use it.</Reveal>
          </div>
          {pinned && (
            <div className="work-count" aria-hidden="true">
              <span><b>{String(idx).padStart(2, '0')}</b> / {String(PROJECTS.length).padStart(2, '0')}</span>
              <div className="work-bar"><motion.i style={{ scaleX: bar }} /></div>
            </div>
          )}
        </div>
        <div className="work-viewport">
          <motion.div className="work-track" ref={trackRef} style={pinned ? { x } : undefined}>
            {PROJECTS.map((p, i) => <Card key={p.name} p={p} i={i} />)}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
