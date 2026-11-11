import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { CountUp, DRAW_EASE, EASE, Reveal, spring } from '../lib/motion.jsx'
import { ICONS, Spark, Up } from '../lib/icons.jsx'

const XS = Array.from({ length: 11 }, (_, i) => 20 + 56 * i)
const B = [150, 140, 144, 122, 128, 106, 112, 94, 88, 80, 70]
const G = [182, 174, 178, 162, 150, 156, 138, 128, 118, 110, 96]
const pts = (ys, a, b) => XS.slice(a, b).map((x, i) => `${x},${ys[a + i]}`).join(' ')
const BAND = [...XS.slice(7).map((x, i) => `${x},${G[7 + i] - i * 7}`), ...XS.slice(7).map((x, i) => `${x},${G[7 + i] + i * 7}`).reverse()].join(' ')
const val = (y) => Math.round((210 - y) * 3)
const HEAT = [0.15, 0.25, 0.45, 0.55, 0.5, 0.4, 0.6, 0.75, 0.95, 1, 0.8, 0.55, 0.35, 0.2]
const HOURS = ['7am', '', '9am', '', '11am', '', '1pm', '', '3pm', '', '5pm', '', '7pm', '']

const SUGGESTIONS = [
  { id: 1, t: 'Stock', c: 'High confidence', p: 'Move 20 more 6 kg cylinders to the main branch before Friday.', why: 'Refills have run about a third higher in month-end weeks.', a: 'Create transfer', done: 'Transfer drafted for approval' },
  { id: 2, t: 'Production', c: 'Medium confidence', p: "Add one goat to Friday's slaughter. The goat pool has sold out by 2 pm on three Saturdays running.", why: 'Stock pool levels against Saturday sales.', a: 'Add to plan', done: "Added to Friday's plan" },
  { id: 3, t: 'Loyalty', c: 'Opportunity', p: "14 regulars haven't visited in 30 days. Send them a points-bonus SMS?", why: 'Points ledger and visit history.', a: 'Send SMS', done: 'SMS queued for 14 customers' },
  { id: 4, t: 'Cash flow', c: 'High confidence', p: 'Three corporate accounts are past 45 days. Send statements today.', why: 'Accounts receivable aging, invoices over 45 days.', a: 'Send statements', done: 'Statements sent' },
  { id: 5, t: 'Margin', c: 'Medium confidence', p: 'Beef margin slipped 3 points after the supplier price rise. Review the per-kg price.', why: 'Weighted average cost against selling price.', a: 'Review price', done: 'Price review opened' },
]

function Chart() {
  const ref = useRef(null)
  const [idx, setIdx] = useState(null)
  const cx = useSpring(XS[10], { stiffness: 300, damping: 30 })
  const by = useSpring(B[10], { stiffness: 300, damping: 30 })
  const gy = useSpring(G[10], { stiffness: 300, damping: 30 })
  const left = useTransform(cx, (v) => `${(v / 600) * 100}%`)
  const shift = useTransform(cx, (v) => `${-(v / 600) * 100}%`)
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * 600
    const i = Math.max(0, Math.min(10, Math.round((x - 20) / 56)))
    setIdx(i); cx.set(XS[i]); by.set(B[i]); gy.set(G[i])
  }
  const reset = () => { setIdx(null); cx.set(XS[10]); by.set(B[10]); gy.set(G[10]) }
  const label = idx === null ? 'Month-end peak' : idx > 7 ? `Forecast · wk ${idx - 7}` : `Week ${idx + 1}`

  return (
    <div className="chart">
      <div className="chart-h"><b>Weekly sales by line</b>
        <span className="legend"><span><i />Butchery</span><span className="g"><i />Gas</span><span className="f"><i />Forecast</span></span>
      </div>
      <div className="plot" ref={ref} onPointerMove={onMove} onPointerLeave={reset}>
        <svg viewBox="0 0 600 222" role="img" aria-label="Illustrative chart: weekly sales for butchery and gas rising over eight weeks, with a three-week forecast continuing the climb">
          <defs><linearGradient id="fz" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#31587c" stopOpacity=".07" /><stop offset="1" stopColor="#31587c" stopOpacity="0" /></linearGradient></defs>
          <g className="grid">{[40, 90, 140, 190].map((y) => <line key={y} x1="0" x2="600" y1={y} y2={y} />)}</g>
          <motion.g variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.8, delay: 1.9 } } }}>
            <rect className="fzone" x={XS[7]} y="10" width={600 - XS[7]} height="180" rx="8" />
            <text className="ax" x={(XS[7] + 600) / 2} y="214" textAnchor="middle">Next 3 weeks</text>
          </motion.g>
          {XS.slice(0, 8).map((x, i) => <text key={x} className="ax" x={x} y="214" textAnchor="middle">W{i + 1}</text>)}
          <motion.polyline className="ln b" points={pts(B, 0, 8)} variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 1.8, ease: DRAW_EASE, delay: 0.3 } } }} />
          <motion.polyline className="ln g" points={pts(G, 0, 8)} variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 1.8, ease: DRAW_EASE, delay: 0.45 } } }} />
          <motion.g variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.8, delay: 1.9 } } }}>
            <polygon className="band" points={BAND} />
            <polyline className="fc b" points={pts(B, 7, 11)} />
            <polyline className="fc g" points={pts(G, 7, 11)} />
            <motion.line className="cross" x1={cx} x2={cx} y1="10" y2="190" animate={{ opacity: idx === null ? 0 : 1 }} />
            <motion.circle className="pt dark" cx={cx} cy={by} r="4.5" animate={{ opacity: idx === null ? 0 : 1 }} />
            <motion.circle className="pt" cx={cx} cy={gy} r="5" />
          </motion.g>
        </svg>
        <motion.div className="tipbox" style={{ left, x: shift }} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { delay: 2.2 } } }}>
          <b>{label}</b>
          {idx !== null && <span>Butchery KSh {val(B[idx])}k · Gas KSh {val(G[idx])}k</span>}
        </motion.div>
      </div>
    </div>
  )
}

function Suggestions() {
  const [queue, setQueue] = useState(SUGGESTIONS)
  const [doneId, setDoneId] = useState(null)
  const [applied, setApplied] = useState(0)
  const act = (id, ok) => {
    if (doneId) return
    if (!ok) { setQueue((q) => q.filter((s) => s.id !== id)); return }
    setDoneId(id)
    setTimeout(() => { setQueue((q) => q.filter((s) => s.id !== id)); setDoneId(null); setApplied((n) => n + 1) }, 1100)
  }
  const visible = queue.slice(0, 3)
  return (
    <div className="ai">
      <div className="ai-h">
        <span className="spark"><Spark /></span>
        <div><b>Suggested next moves</b><small>{applied ? `${applied} applied this week` : "From this week's sales, stock and loyalty data"}</small></div>
        <span className="think" aria-hidden="true"><i /><i /><i /></span>
      </div>
      <motion.ul className="sg" layout variants={{ show: { transition: { staggerChildren: 0.35, delayChildren: 0.8 } } }} aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((s, i) => (
            <motion.li key={s.id} layout className={i === 0 ? 'top' : undefined}
              variants={{ hidden: { opacity: 0, y: 18, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 180, damping: 20 } } }}
              initial="hidden" animate="show"
              exit={{ opacity: 0, x: 60, scale: 0.95, transition: { duration: 0.35, ease: EASE } }}
              transition={{ layout: { type: 'spring', stiffness: 260, damping: 28 } }}>
              <span className="t">{s.t} <em>{s.c}</em></span>
              <p>{s.p}</p>
              <span className="why">{s.why}</span>
              <AnimatePresence mode="wait" initial={false}>
                {doneId === s.id ? (
                  <motion.span key="d" className="done" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><circle cx="10" cy="10" r="9" fill="#31587c" /><motion.path d="M6 10.5l2.6 2.6L14 7.6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.1 }} /></svg>
                    {s.done}
                  </motion.span>
                ) : (
                  <motion.span key="a" className="acts" exit={{ opacity: 0, y: -6 }}>
                    <motion.button type="button" className="ok" whileTap={{ scale: 0.94 }} whileHover={{ y: -1 }} onClick={() => act(s.id, true)}>{s.a}</motion.button>
                    <motion.button type="button" whileTap={{ scale: 0.94 }} onClick={() => act(s.id, false)}>Dismiss</motion.button>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
          {visible.length === 0 && (
            <motion.li key="empty" className="empty" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <b>You're all caught up.</b>
              <p>New suggestions appear as the week's data comes in.</p>
              <button type="button" onClick={() => { setQueue(SUGGESTIONS); setApplied(0) }}>Replay the demo</button>
            </motion.li>
          )}
        </AnimatePresence>
      </motion.ul>
    </div>
  )
}

export default function Insights() {
  const reduce = useReducedMotion()
  const wrapRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start end', 'start 35%'] })
  const enterRotate = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 18, 0])
  const enterScale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.9, 1])
  const enterY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 60, 0])
  const mx = useMotionValue(0), my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 120, damping: 18 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 120, damping: 18 })
  const tilt = (e) => {
    if (reduce || e.pointerType === 'touch') return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const untilt = () => { mx.set(0); my.set(0) }

  return (
    <section className="insights" id="insights" aria-labelledby="insights-title">
      <div className="wrap center">
        <Reveal as="span" className="ai-badge"><Spark />Analytics + AI</Reveal>
        <Reveal as="h2" id="insights-title" delay={0.06} blur>Your data, finally making sense.</Reveal>
        <Reveal as="p" className="lede" delay={0.12}>Every sale, refill and transfer your system records tells you something. We turn it into clear dashboards and AI-powered suggestions: what to restock, who to win back, where margin is slipping. Decisions made on evidence, not on gut feel.</Reveal>

        <div className="stage" ref={wrapRef}>
          <motion.div style={{ rotateX: enterRotate, scale: enterScale, y: enterY }} className="stage-in">
            <motion.div className="dash" style={{ rotateX: rx, rotateY: ry, transformPerspective: 1600 }} onPointerMove={tilt} onPointerLeave={untilt}
              initial="hidden" whileInView="show" viewport={{ once: true, margin: '0px 0px -120px 0px' }}>
              <div className="dash-bar" aria-hidden="true">
                <span className="dots"><i /><i /><i /></span>
                <span className="ttl"><b>Insights</b> · Butchery &amp; Gas · All branches</span>
                <span className="live">Live</span>
              </div>
              <div className="dash-body">
                <div className="dash-main">
                  <div className="kpis">
                    {[['Sales this week', 412, 'KSh ', 'k', '12%'], ['Gas refills', 186, '', '', '8%'], ['Meat sold', 640, '', ' kg', '5%'], ['Loyalty redemptions', 92, '', '', '21%']].map(([l, v, pre, suf, d], i) => (
                      <motion.div key={l} className="kpi" whileHover={{ y: -3 }}
                        variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { ...spring, delay: 0.2 + i * 0.08 } } }}>
                        <span className="l">{l}</span><span className="v"><CountUp to={v} prefix={pre} suffix={suf} delay={0.3 + i * 0.08} /></span><span className="d"><Up />{d}</span>
                      </motion.div>
                    ))}
                  </div>
                  <Chart />
                  <div className="heat">
                    <div className="chart-h"><b>Busiest hours · Saturdays</b><span className="legend">Peak 4–5 pm</span></div>
                    <div className="cells" role="img" aria-label="Illustrative heat strip: Saturday trade builds through the day and peaks between 4 and 5 pm">
                      {HEAT.map((o, i) => (
                        <motion.i key={i} style={{ '--o': o, originY: 1 }} whileHover={{ scaleY: 1.25 }}
                          variants={{ hidden: { scaleY: 0.15 }, show: { scaleY: 1, transition: { type: 'spring', stiffness: 160, damping: 14, delay: 1.1 + i * 0.04 } } }} />
                      ))}
                    </div>
                    <div className="hl" aria-hidden="true">{HOURS.map((h, i) => <span key={i}>{h}</span>)}</div>
                  </div>
                </div>
                <Suggestions />
              </div>
            </motion.div>
          </motion.div>
        </div>
        <p className="fine">Illustrative figures. Try the suggestions. Each dashboard is built around the numbers your business runs on.</p>

        <div className="pillars">
          {[['bars', '01 · See', 'Dashboards in your language', 'Built around the numbers you actually run on: kilos, cylinders, branches, accounts. Not a generic template.'],
            ['spark', '02 · Understand', 'AI that explains itself', 'Every suggestion shows the data behind it, so you can see why before you act.'],
            ['shield', '03 · Decide', 'You stay in control', 'Nothing changes on its own. You approve every move, and each month we go through the trends with you.']].map(([ic, k, h, p], i) => (
            <Reveal key={k} className="pillar" delay={i * 0.08}>
              <motion.span className="ic" aria-hidden="true" whileHover={{ rotate: -10, scale: 1.1 }}>{ic === 'spark' ? <Spark /> : ICONS[ic]}</motion.span>
              <div><span className="k">{k}</span><h3>{h}</h3><p>{p}</p></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
