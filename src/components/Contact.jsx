import { useEffect, useRef, useState } from 'react'

const contacts = [
  {
    label: 'Email',
    value: 'muthubharani2004@gmail.com',
    href: 'mailto:muthubharani2004@gmail.com',
  },
  {
    label: 'Phone',
    value: '+91 78069 56235',
    href: 'tel:+917806956235',
  },
  {
    label: 'LinkedIn',
    value: 'muthu-bharani-p-10b916281',
    href: 'https://linkedin.com/in/muthu-bharani-p-10b916281',
  },
  {
    label: 'GitHub',
    value: 'github.com/muthubharani',
    href: 'https://github.com/muthubharani',
  },
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

// Every shape has pathLength="1" so the CSS can "draw" it
const icons = {
  email: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" pathLength="1" />
      <path d="m22 7-10 6L2 7" pathLength="1" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        pathLength="1"
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
      />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        pathLength="1"
        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
      />
      <rect x="2" y="9" width="4" height="12" pathLength="1" />
      <circle cx="4" cy="4" r="2" pathLength="1" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        pathLength="1"
        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
      />
    </svg>
  ),
}

export default function Contact() {
  const [headRef, headInView] = useInViewOnce(0.3)
  const [gridRef, gridInView] = useInViewOnce(0.25)

  return (
    <section id="contact" className="section section--contact">
      <div className="section__inner">
        <div
          ref={headRef}
          className={`section__head contact-head ${headInView ? 'is-visible' : ''}`}
        >
          <span className="eyebrow">Contact</span>
          <h2 className="section__title">Let's build something</h2>
          <p className="section__subtitle">
            Currently based in Oddanchatram, Dindigul &mdash; happy to relocate to Coimbatore for the
            right front-end role. Reach out any time.
          </p>
        </div>

        <div
          ref={gridRef}
          className={`contact-grid ${gridInView ? 'is-visible' : ''}`}
        >
          {contacts.map((contact, i) => (
            <a
              className="contact-card"
              key={contact.label}
              href={contact.href}
              style={{ '--i': i }}
              target={contact.href.startsWith('http') ? '_blank' : undefined}
              rel={contact.href.startsWith('http') ? 'noreferrer' : undefined}
            >
              <span className="contact-card__icon">
                {icons[contact.label.toLowerCase()]}
              </span>
              <span className="contact-card__arrow" aria-hidden="true">↗</span>
              <span className="contact-card__label">{contact.label}</span>
              <span className="contact-card__value">{contact.value}</span>
            </a>
          ))}
        </div>

        <button
          type="button"
          className="btn btn--ghost contact-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="contact-top__arrow" aria-hidden="true">↑</span> Back to top
        </button>
      </div>
    </section>
  )
}
