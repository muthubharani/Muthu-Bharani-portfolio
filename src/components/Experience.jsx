import { useEffect, useRef, useState } from 'react'

const roles = [
  {
    period: 'Apr 2026 — Present',
    title: 'Software Engineer (Full-Time)',
    org: 'Namuvi Technologies Private Limited, Chennai',
    points: [
      'Working on front-end development tasks using modern web technologies for client-facing applications.',
      'Collaborating with cross-functional teams to develop and maintain responsive web interfaces.',
      'Applying HTML5, CSS3 and JavaScript best practices for scalable, maintainable code.',
    ],
  },
  {
    period: 'Feb 2026 — Mar 2026',
    title: 'Software Engineer Intern',
    org: 'Namuvi Technologies Private Limited, Chennai',
    points: [
      'Gained industry exposure in full-stack development within a professional team environment.',
      'Contributed to web development projects involving front-end design and database integration.',
      'Built and tested web components under real-world project constraints.',
    ],
  },
]

// Fills the timeline line as the page scrolls (sets --progress from 0 to 1)
function useScrollProgress(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let frame = null

    const update = () => {
      frame = null
      const rect = el.getBoundingClientRect()
      const trigger = window.innerHeight * 0.55
      const p = Math.min(1, Math.max(0, (trigger - rect.top) / rect.height))
      el.style.setProperty('--progress', p.toFixed(4))
    }
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [ref])
}

// Tracks whether the heading is currently in view so its reveal can replay.
function useInViewOnce(threshold = 0.3) {
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

function TimelineItem({ role }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  const [active, setActive] = useState(false) // currently mid-screen
  const isCurrent = role.period.includes('Present')

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const seenObserver = new IntersectionObserver(
      ([entry]) => setSeen(entry.isIntersecting),
      { rootMargin: '0px 0px -20% 0px', threshold: 0.15 }
    )
    const activeObserver = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: '-40% 0px -40% 0px' }
    )

    seenObserver.observe(el)
    activeObserver.observe(el)
    return () => {
      seenObserver.disconnect()
      activeObserver.disconnect()
    }
  }, [])

  return (
    <article
      ref={ref}
      className={`timeline__item ${seen ? 'is-visible' : ''} ${active ? 'is-active' : ''}`}
    >
      <div className="timeline__marker" aria-hidden="true" />
      <div className="timeline__content">
        <div className="timeline__meta">
          <span className="timeline__period">{role.period}</span>
          {isCurrent && (
            <span className="timeline__badge">
              <span className="status-dot" /> Current
            </span>
          )}
        </div>
        <h3 className="timeline__title">{role.title}</h3>
        <p className="timeline__org">{role.org}</p>
        <ul className="timeline__points">
          {role.points.map((point, i) => (
            <li key={point} style={{ '--i': i }}>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default function Experience() {
  const timelineRef = useRef(null)
  const [headRef, headInView] = useInViewOnce(0.3)
  useScrollProgress(timelineRef)

  return (
    <section id="experience" className="section">
      <div className="section__inner">
        <div
          ref={headRef}
          className={`section__head exp-reveal ${headInView ? 'is-visible' : ''}`}
        >
          <span className="eyebrow">Experience</span>
          <h2 className="section__title">Where I've been building</h2>
        </div>

        <div className="timeline" ref={timelineRef}>
          {roles.map((role) => (
            <TimelineItem role={role} key={role.period} />
          ))}
        </div>
      </div>
    </section>
  )
}
