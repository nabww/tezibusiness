import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import 'lenis/dist/lenis.css'
import './index.css'
import './fluid.css'
import ProductPage, { TEZICARE } from './pages/ProductPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <ProductPage p={TEZICARE} />
    </MotionConfig>
  </StrictMode>,
)
