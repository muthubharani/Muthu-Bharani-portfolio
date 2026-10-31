import { useEffect, useRef, useState } from 'react'

const certifications = [
  'AWS Certified Cloud Practitioner — Global Certification',
  'Front End Development — Great Learning',
  'Introduction to Java',
]

const publications = [
  {
    title: '"A Machine Learning-Based Approach for Cyber Threat Detection and Prevention for IT Industry"',
    detail: 'Presented at the IEEE-supported International Conference on Connected Intelligence for Industrial Applications, Akal University, April 2026.',
  },
]

const achievements = [
  'Participated in AI CONCLAVE 1.0 Hackathon, Kongu Engineering College, Erode.',
  "Presented the Mentor Mentee System project at the National Conference, Arasu Engineering College, Kumbakonam.",
  'March Past — 1st Prize (Independence Day 2023), 2nd Prize (Sports Day 2024), 3rd Prize (Republic Day 2024 & Sports Day 2025).',
]

const languages = [
  { name: 'English', level: 'Proficient' },
  { name: 'Tamil', level: 'Native' },
]

// Tracks whether the element is currently in view so reveals can replay.
function useInViewOnce(threshold = 0.2) {
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

const icons = {
  award: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="9" r="6" />
      <path d="M8.5 14.5 7 22l5-3 5 3-1.5-7.5" />
    </svg>
  ),
  paper: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 2h9l5 5v15H6z" />
      <path d="M14 2v6h6M9 13h8M9 17h8" />
    </svg>
  ),
  trophy: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 3h8v6a4 4 0 0 1-8 0z" />
      <path d="M8 5H4v2a4 4 0 0 0 4 4M16 5h4v2a4 4 0 0 1-4 4M12 13v4M8 21h8M10 17h4" />
    </svg>
  ),
}

function CredentialCard({ title, icon, index, children }) {
  const [ref, inView] = useInViewOnce(0.2)

  return (
    <div
      ref={ref}
      className={`credential-card ${inView ? 'is-visible' : ''}`}
      style={{ '--delay': `${index * 150}ms` }}
    >
      <div className="credential-card__head">
        <span className="credential-card__icon">{icons[icon]}</span>
        <h3 className="credential-card__title">{title}</h3>
      </div>
      {children}
    </div>
  )
}

export default function Credentials() {
  const [headRef, headInView] = useInViewOnce(0.3)
  const [langRef, langInView] = useInViewOnce(0.5)

  return (
    <section id="credentials" className="section">
      <div className="section__inner">
        <div
          ref={headRef}
          className={`section__head cred-reveal ${headInView ? 'is-visible' : ''}`}
        >
          <span className="eyebrow">Credentials</span>
          <h2 className="section__title">Certifications, research &amp; recognition</h2>
        </div>

        <div className="credentials-grid">
          <CredentialCard title="Certifications" icon="award" index={0}>
            <ul className="credential-card__list">
              {certifications.map((item, i) => (
                <li key={item} style={{ '--i': i }}>
                  {item}
                </li>
              ))}
            </ul>
          </CredentialCard>

          <CredentialCard title="Publications & research" icon="paper" index={1}>
            <ul className="credential-card__list">
              {publications.map((pub, i) => (
                <li key={pub.title} style={{ '--i': i }}>
                  {pub.title}
                  <span className="credential-card__detail">{pub.detail}</span>
                </li>
              ))}
            </ul>
          </CredentialCard>

          <CredentialCard title="Achievements & activities" icon="trophy" index={2}>
            <ul className="credential-card__list">
              {achievements.map((item, i) => (
                <li key={item} style={{ '--i': i }}>
                  {item}
                </li>
              ))}
            </ul>
          </CredentialCard>
        </div>

        <div
          ref={langRef}
          className={`languages ${langInView ? 'is-visible' : ''}`}
        >
          <span className="languages__label">Languages</span>
          <div className="languages__items">
            {languages.map((lang, i) => (
              <span
                className="tag tag--muted"
                key={lang.name}
                style={{ '--t': i }}
              >
                {lang.name} &middot; {lang.level}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
