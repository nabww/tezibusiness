export const Spark = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 2.5l1.9 5.6 5.6 1.9-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.9z" />
    <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" opacity=".75" />
  </svg>
)
export const Up = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M5 1.5L9 6.5H1z" fill="currentColor" /></svg>
)
const line = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }
export const ICONS = {
  call: <svg viewBox="0 0 24 24" {...line}><path d="M3 7.5A1.5 1.5 0 0 1 4.5 6h8A1.5 1.5 0 0 1 14 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 3 16.5z" /><path d="M14 10.5l6-3v9l-6-3" /></svg>,
  disc: <svg viewBox="0 0 24 24" {...line}><path d="M9 3.5h6v3H9z" /><path d="M15 5h2.5v15.5h-11V5H9" /><circle cx="11.5" cy="13" r="2.5" /><path d="M13.3 14.8l2.2 2.2" /></svg>,
  build: <svg viewBox="0 0 24 24" {...line}><path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5.5l-3 13" /></svg>,
  loop: <svg viewBox="0 0 24 24" {...line}><path d="M20 12a8 8 0 1 1-2.34-5.66" /><path d="M20 4.5V9h-4.5" /></svg>,
  bars: <svg viewBox="0 0 24 24" {...line} strokeWidth="1.7"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg>,
  shield: <svg viewBox="0 0 24 24" {...line} strokeWidth="1.7"><path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" /><path d="M9 12l2 2 4-4" /></svg>,
  retail: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#31587c" strokeWidth="1.8"><path d="M3 9l1.5-5h15L21 9M3 9v11h18V9M3 9h18M9 20v-6h6v6" /></svg>,
  wholesale: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#31587c" strokeWidth="1.8"><path d="M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10" /></svg>,
  logistics: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#31587c" strokeWidth="1.8"><path d="M2 6h12v10H2zM14 10h4l4 3v3h-8M6 19a2 2 0 100-4 2 2 0 000 4zM18 19a2 2 0 100-4 2 2 0 000 4z" /></svg>,
}
