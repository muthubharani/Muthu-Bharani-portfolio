import { useEffect, useRef, useState } from 'react'

const records = [
  {
    score: '7.5',
    scoreLabel: 'CGPA',
    title: 'B.Tech in Information Technology',
    place: 'M Kumarasamy College of Engineering, Karur',
    period: '2022 — 2026',
  },
  {
    score: '86.5%',
    scoreLabel: 'Aggregate',
    title: 'Higher Secondary (HSC)',
    place: 'Christian Matriculation Higher Secondary School, Oddanchatram',
    period: '2021 — 2022',
  },
  {
    score: '75%',
    scoreLabel: 'Aggregate',
    title: 'SSLC',
    place: 'Christian Matriculation Higher Secondary School, Oddanchatram',
    period: '2019 — 2020',
  },
]

// Tracks whether the element is currently in view so reveals can replay.
function useInViewOnce(threshold = 0.25) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}

// Counts from 0 to the number inside a string like "86.5%" or "7.5"
function CountUp({ value, start, delay = 0, duration = 1400 }) {
  const match = String(value).match(/[\d.]+/)
  const target = match ? parseFloat(match[0]) : 0
  const decimals = match && match[0].includes('.') ? match[0].split('.')[1].length : 0
  const prefix = match ? String(value).slice(0, match.index) : ''
  const suffix = match ? String(value).slice(match.index + match[0].length) : ''
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!start) {
      setCurrent(0)
      return
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setCurrent(target)
      return
    }
    let frame
    let t0 = null
    const timeout = setTimeout(() => {
      const tick = (now) => {
        if (t0 === null) t0 = now
        const p = Math.min(1, (now - t0) / duration)
        const eased = 1 - Math.pow(1 - p, 3)
        setCurrent(target * eased)
        if (p < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, delay)
    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(frame)
    }
  }, [start, target, delay, duration])

  return (
    <>
      {prefix}
      {current.toFixed(decimals)}
      {suffix}
    </>
  )
}

function EducationCard({ record, index }) {
  const [ref, inView] = useInViewOnce(0.3)

  // Ring fill: CGPA is out of 10, percentages are out of 100
  const num = parseFloat(String(record.score).match(/[\d.]+/)[0])
  const percent = String(record.score).includes('%') ? num : num * 10
  const side = index % 2 === 0 ? 'from-left' : 'from-right'

  return (
    <div
      ref={ref}
      className={`education-card ${side} ${inView ? 'is-visible' : ''}`}
      style={{ '--percent': percent, '--delay': `${index * 120}ms` }}
    >
      <span className="education-card__node" aria-hidden="true" />

      <div className="education-card__score">
        <div className="education-card__ring">
          <svg viewBox="0 0 80 80" aria-hidden="true">
            <circle className="ring__track" cx="40" cy="40" r="34" />
            <circle className="ring__fill" cx="40" cy="40" r="34" pathLength="100" />
          </svg>
          <span className="education-card__number">
            <CountUp value={record.score} start={inView} delay={400 + index * 120} />
          </span>
        </div>
        <span className="education-card__score-label">{record.scoreLabel}</span>
      </div>

      <div className="education-card__body">
        <h3 className="education-card__title">{record.title}</h3>
        <p className="education-card__place">{record.place}</p>
        <span className="education-card__period">{record.period}</span>
      </div>
    </div>
  )
}

export default function Education() {
  const [headRef, headInView] = useInViewOnce(0.3)

  return (
    <section id="education" className="section">
      <div className="section__inner">
        <div
          ref={headRef}
          className={`section__head edu-reveal ${headInView ? 'is-visible' : ''}`}
        >
          <span className="eyebrow">Education</span>
          <h2 className="section__title">Academic record</h2>
        </div>

        <div className="education-grid">
          {records.map((record, index) => (
            <EducationCard record={record} index={index} key={record.title} />
          ))}
        </div>
      </div>
    </section>
  )
}
