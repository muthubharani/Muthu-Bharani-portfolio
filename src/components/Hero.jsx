import { useEffect, useState } from 'react'

const roles = [
  'Front-End Developer',
  'React & JavaScript Engineer',
  'AWS Certified Cloud Practitioner',
  'ML Research Co-Author',
]

const kpis = [
  { value: '2026', label: 'B.Tech IT graduate' },
  { value: '7.5', label: 'CGPA' },
  { value: '06', label: 'Projects shipped' },
  { value: '01', label: 'IEEE publication' },
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState('typing') // typing | pausing | deleting

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout

    if (phase === 'typing') {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 55)
      } else {
        timeout = setTimeout(() => setPhase('pausing'), 1400)
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), 600)
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), 30)
      } else {
        setRoleIndex((i) => (i + 1) % roles.length)
        setPhase('typing')
      }
    }

    return () => clearTimeout(timeout)
  }, [text, phase, roleIndex])

  const handleClick = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="top" className="hero">
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__inner">
        <div className="hero__status">
          <span className="status-dot" aria-hidden="true" />
          Available for new opportunities &middot; Open to relocate to any locations
        </div>

        {/* <p className="hero__eyebrow">
          <span className="hero__prompt">visitor@portfolio:~$</span> whoami
        </p> */}

        <h1 className="hero__name">Muthu&nbsp;Bharani&nbsp;P</h1>

        <p className="hero__role">
          <span className="hero__role-text">{text}</span>
          <span className="hero__cursor" aria-hidden="true">|</span>
        </p>

        <p className="hero__summary">
          Building responsive, accessible interfaces with HTML5, CSS3, JavaScript and React.
          Currently shipping front-end features as a Software Engineer at Namuvi Technologies,
          Chennai &mdash; with a side interest in data dashboards and applied machine learning.
        </p>

        <div className="hero__actions">
          <button className="btn btn--primary" onClick={() => handleClick('projects')}>
            View projects
          </button>
          <button className="btn btn--ghost" onClick={() => handleClick('contact')}>
            Get in touch
          </button>
        </div>

        <div className="hero__kpis">
          {kpis.map((kpi) => (
            <div className="kpi" key={kpi.label}>
              <span className="kpi__value">{kpi.value}</span>
              <span className="kpi__label">{kpi.label}</span>
            </div>
          ))}
        </div>

        <p className="hero__location">
          Based in Oddanchatram, Dindigul, Tamil Nadu, India
        </p>
      </div>
    </section>
  )
}
