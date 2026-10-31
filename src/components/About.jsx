import { Fragment, useEffect, useRef, useState } from 'react'

const softSkills = ['Time management', 'Adaptability', 'Teamwork', 'Problem solving']

const title =
  'A software engineer who enjoys turning ideas into real-world solutions.'

const aboutText =
  "I'm a passionate Software Developer with a B.Tech in Information Technology. I work with React, JavaScript, Node.js, Express.js, MySQL, and AWS to build responsive websites and web applications. I'm interested in frontend, backend, and full-stack development, and I enjoy learning new technologies and solving real-world problems. I'm open to relocation anywhere in India for the right opportunity."

// Words that get the highlighter sweep
const keywordPattern = /(React|JavaScript|Node\.js|Express\.js|MySQL|AWS)/

const rows = [
  { label: 'status', value: 'status' },
  { label: 'role', value: 'Software Engineer' },
  { label: 'company', value: 'Namuvi Technologies Pvt. Ltd., Chennai' },
  { label: 'since', value: 'April 2026' },
  { label: 'target', value: 'Front-End Developer, Coimbatore' },
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

// Splits the paragraph and wraps tech keywords in a highlighter span
function HighlightedText({ text }) {
  let k = 0
  return text.split(keywordPattern).map((part, i) =>
    i % 2 === 1 ? (
      <span className="about-hl" key={i} style={{ '--k': k++ }}>
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  )
}

export default function About() {
  const [headRef, headInView] = useInViewOnce(0.3)
  const [textRef, textInView] = useInViewOnce(0.3)
  const [cardRef, cardInView] = useInViewOnce(0.25)

  return (
    <section id="about" className="section">
      <div className="section__inner about">
        <div
          ref={headRef}
          className={`section__head about-head ${headInView ? 'is-visible' : ''}`}
        >
          <span className="eyebrow">Overview</span>
          <h2 className="section__title">
            {title.split(' ').map((word, i) => (
              <Fragment key={i}>
                <span className="about-word">
                  <span style={{ '--w': i }}>{word}</span>
                </span>{' '}
              </Fragment>
            ))}
          </h2>
        </div>

        <div className="about__grid">
          <p
            ref={textRef}
            className={`about__text ${textInView ? 'is-visible' : ''}`}
          >
            <HighlightedText text={aboutText} />
          </p>

          <div
            ref={cardRef}
            className={`now-card ${cardInView ? 'is-visible' : ''}`}
          >
            {rows.map((row, i) => (
              <div className="now-card__row" key={row.label} style={{ '--i': i }}>
                <span className="now-card__label">{row.label}</span>
                <span className="now-card__value">
                  {row.label === 'status' ? (
                    <>
                      <span className="status-dot status-dot--small" aria-hidden="true" />{' '}
                      Employed, open to new roles
                    </>
                  ) : (
                    row.value
                  )}
                </span>
              </div>
            ))}
            <div className="now-card__divider" />
            <div className="now-card__tags">
              {softSkills.map((skill, i) => (
                <span className="tag tag--muted" key={skill} style={{ '--t': i }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
