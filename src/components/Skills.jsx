import { useEffect, useRef, useState } from 'react'

const groups = [
  {
    label: 'Front-end',
    items: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Bootstrap', 'React JS'],
  },
  {
    label: 'Runtime & languages',
    items: ['Node.js', 'Java'],
  },
  {
    label: 'Databases',
    items: ['MySQL', 'MongoDB'],
  },
  {
    label: 'Cloud & data',
    items: ['AWS (Cloud Practitioner)', 'Power BI'],
  },
  {
    label: 'Practices',
    items: ['Responsive design', 'Cross-browser compatibility', 'Mobile-first design'],
  },
  {
    label: 'Tools',
    items: ['Git', 'GitHub', 'VS Code', 'Excel'],
  },
]

// Tracks whether the element is currently in view so reveals can replay.
function useInView(threshold = 0.15) {
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

function SkillCard({ group, index }) {
  const [ref, inView] = useInView(0.2)

  // Cursor-following glow
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <div
      ref={ref}
      className={`skill-card ${inView ? 'is-visible' : ''}`}
      style={{ '--delay': `${(index % 3) * 120}ms` }}
      onMouseMove={handleMouseMove}
    >
      <span className="skill-card__label">{group.label}</span>
      <div className="skill-card__tags">
        {group.items.map((item, i) => (
          <span className="tag" key={item} style={{ '--t': i }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const [headRef, headInView] = useInView(0.3)

  return (
    <section id="skills" className="section">
      <div className="section__inner">
        <div
          ref={headRef}
          className={`section__head skills-reveal ${headInView ? 'is-visible' : ''}`}
        >
          <span className="eyebrow">Stack</span>
          <h2 className="section__title">Tools I reach for</h2>
        </div>

        <div className="skills-grid">
          {groups.map((group, index) => (
            <SkillCard group={group} index={index} key={group.label} />
          ))}
        </div>
      </div>
    </section>
  )
}
