import { useEffect, useRef, useState } from 'react'

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
  const [active, setActive] = useState('')
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })
  const headerRef = useRef(null)
  const linkRefs = useRef({})

  // Scroll: compact bar, progress line and active-section tracking
  useEffect(() => {
    let frame = null

    const update = () => {
      frame = null
      const y = window.scrollY
      setScrolled(y > 12)

      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0
      if (headerRef.current) headerRef.current.style.setProperty('--p', p.toFixed(4))

      const line = window.innerHeight * 0.35
      let current = ''
      for (const link of links) {
        const el = document.getElementById(link.id)
        if (el && el.getBoundingClientRect().top <= line) current = link.id
      }
      if (max > 0 && y >= max - 4) current = links[links.length - 1].id
      setActive(current)
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
  }, [])

  // Move the sliding underline to the active link
  useEffect(() => {
    const measure = () => {
      const el = linkRefs.current[active]
      if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth })
      else setIndicator((prev) => ({ ...prev, width: 0 }))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [active])

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const handleClick = (id) => {
    setOpen(false)
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      ref={headerRef}
      className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
    >
      <div className="nav__progress" aria-hidden="true" />

      <div className="nav__inner">
        <a className="nav__logo" href="#top" onClick={(e) => { e.preventDefault(); handleClick('top') }}>
          {/* <span className="nav__logo-mark">MB</span>
          <span className="nav__logo-cursor">_</span> */}
        </a>

        <nav className="nav__links nav__links--desktop" aria-label="Section navigation">
          <span
            className="nav__indicator"
            aria-hidden="true"
            style={{
              width: `${indicator.width}px`,
              transform: `translateX(${indicator.left}px)`,
            }}
          />
          {links.map((link, i) => (
            <button
              key={link.id}
              ref={(el) => { linkRefs.current[link.id] = el }}
              className={`nav__link ${active === link.id ? 'is-active' : ''}`}
              style={{ '--i': i }}
              aria-current={active === link.id ? 'true' : undefined}
              onClick={() => handleClick(link.id)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button
          className={`nav__toggle ${open ? 'is-open' : ''}`}
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
          {links.map((link, i) => (
            <button
              key={link.id}
              className={`nav__link ${active === link.id ? 'is-active' : ''}`}
              style={{ '--i': i }}
              onClick={() => handleClick(link.id)}
            >
              {link.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}
