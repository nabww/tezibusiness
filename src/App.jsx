import { useEffect } from 'react'
import Lenis from 'lenis'
import { MotionConfig, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import Nav from './sections/Nav.jsx'
import Hero from './sections/Hero.jsx'
import Who from './sections/Who.jsx'
import Process from './sections/Process.jsx'
import Case from './sections/Case.jsx'
import Insights from './sections/Insights.jsx'
import Story from './sections/Story.jsx'
import Work from './sections/Work.jsx'
import Products from './sections/Products.jsx'
import How from './sections/How.jsx'
import System from './sections/System.jsx'
import { Final, Footer } from './sections/Final.jsx'

function useSmoothScroll() {
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) return
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: { offset: -58 },
    })
    let id = requestAnimationFrame(function raf(t) { lenis.raf(t); id = requestAnimationFrame(raf) })
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [reduce])
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  return <motion.div className="progress" style={{ scaleX }} aria-hidden="true" />
}

export default function App() {
  useSmoothScroll()
  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        <Who />
        <Process />
        <Case />
        <Insights />
        <Story />
          <Work />
          <Products />
        <How />
        <System />
        <Final />
      </main>
      <Footer />
    </MotionConfig>
  )
}
