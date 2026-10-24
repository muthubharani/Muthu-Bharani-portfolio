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

export default function Contact() {
  return (
    <section id="contact" className="section section--contact">
      <div className="section__inner">
        <div className="section__head">
          <span className="eyebrow">Contact</span>
          <h2 className="section__title">Let's build something</h2>
          <p className="section__subtitle">
            Currently based in Oddanchatram, Dindigul &mdash; happy to relocate to Coimbatore for the
            right front-end role. Reach out any time.
          </p>
        </div>

        <div className="contact-grid">
          {contacts.map((contact) => (
            <a
              className="contact-card"
              key={contact.label}
              href={contact.href}
              target={contact.href.startsWith('http') ? '_blank' : undefined}
              rel={contact.href.startsWith('http') ? 'noreferrer' : undefined}
            >
              <span className="contact-card__label">{contact.label}</span>
              <span className="contact-card__value">{contact.value}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
