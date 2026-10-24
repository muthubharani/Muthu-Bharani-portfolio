import { useEffect, useState } from 'react'

const links = [
  { id: 'about', label: 'Overview' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Stack' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (id) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <a className="nav__logo" href="#top" onClick={(e) => { e.preventDefault(); handleClick('top') }}>
          <span className="nav__logo-mark">MB</span>
          <span className="nav__logo-cursor">_</span>
        </a>

        <nav className="nav__links nav__links--desktop" aria-label="Section navigation">
          {links.map((link) => (
            <button key={link.id} className="nav__link" onClick={() => handleClick(link.id)}>
              {link.label}
            </button>
          ))}
        </nav>

        <button
          className="nav__toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <nav className="nav__links nav__links--mobile" aria-label="Section navigation (mobile)">
          {links.map((link) => (
            <button key={link.id} className="nav__link" onClick={() => handleClick(link.id)}>
              {link.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}
