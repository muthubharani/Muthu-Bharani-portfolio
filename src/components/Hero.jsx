import { useEffect, useRef, useState } from 'react'

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
const nameWords = ['Muthu', 'Bharani', 'P']

// Counts from 0 up to the number in a string like "7.5" or "06" (keeps leading zeros)
function CountUp({ value, delay = 0, duration = 1600 }) {
  const str = String(value)
  const target = parseFloat(str)
  const decimals = str.includes('.') ? str.split('.')[1].length : 0
  const width = decimals === 0 ? str.length : 0
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCurrent(target)
      return
    }
    let frame
    let t0 = null
    const timeout = setTimeout(() => {
      const tick = (now) => {
        if (t0 === null) t0 = now
        const p = Math.min(1, (now - t0) / duration)
        setCurrent(target * (1 - Math.pow(1 - p, 3)))
        if (p < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, delay)
    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(frame)
    }
  }, [target, delay, duration])

  return decimals
    ? current.toFixed(decimals)
    : String(Math.round(current)).padStart(width, '0')
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState('')
  const [decodeText, setDecodeText] = useState('')
  const [decoded, setDecoded] = useState(false)
  const [phase, setPhase] = useState('typing') // typing | pausing | deleting
  const heroRef = useRef(null)
  const canvasRef = useRef(null)
  const pointerRef = useRef({ x: null, y: null })
  const [heroVisible, setHeroVisible] = useState(false)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const finalText = roles[0]

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDecodeText(finalText)
      setText(finalText)
      setDecoded(true)
      setPhase('pausing')
      return
    }

    let frame = null
    let startTime = null
    let lastUpdate = 0

    const tick = (now) => {
      if (startTime === null) startTime = now
      const progress = Math.min(1, (now - startTime) / 1200)

      if (now - lastUpdate >= 50 || progress === 1) {
        lastUpdate = now
        const revealed = Math.floor(progress * finalText.length)
        const scrambled = finalText
          .split('')
          .map((character, index) => {
            if (character === ' ' || index < revealed) return character
            const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&'
            return alphabet[Math.floor(Math.random() * alphabet.length)]
          })
          .join('')

        setDecodeText(scrambled)
      }

      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        setDecodeText(finalText)
        setText(finalText)
        setDecoded(true)
        setPhase('pausing')
      }
    }

    const timeout = window.setTimeout(() => {
      frame = requestAnimationFrame(tick)
    }, 1750)

    return () => {
      window.clearTimeout(timeout)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    if (!decoded) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const current = roles[roleIndex]
      if (text !== current) setText(current)
      return
    }

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
  }, [decoded, text, phase, roleIndex])

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const particles = []
    let width = 0
    let height = 0
    let frame = null

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      particles.length = 0
      const count = Math.min(42, Math.max(20, Math.round(width / 30)))

      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.24,
          vy: (Math.random() - 0.5) * 0.24,
        })
      }

      if (reducedMotion) draw(false)
    }

    const draw = (animate) => {
      context.clearRect(0, 0, width, height)

      if (animate) {
        particles.forEach((particle) => {
          particle.x += particle.vx
          particle.y += particle.vy
          if (particle.x < 0) particle.x += width
          if (particle.x > width) particle.x -= width
          if (particle.y < 0) particle.y += height
          if (particle.y > height) particle.y -= height
        })
      }

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i]

        for (let j = i + 1; j < particles.length; j += 1) {
          const other = particles[j]
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y)

          if (distance < 115) {
            context.beginPath()
            context.moveTo(particle.x, particle.y)
            context.lineTo(other.x, other.y)
            context.strokeStyle = `rgba(94, 234, 212, ${(1 - distance / 115) * 0.14})`
            context.stroke()
          }
        }

        const pointer = pointerRef.current
        if (pointer.x !== null && pointer.y !== null) {
          const distance = Math.hypot(particle.x - pointer.x, particle.y - pointer.y)
          if (distance < 150) {
            context.beginPath()
            context.moveTo(particle.x, particle.y)
            context.lineTo(pointer.x, pointer.y)
            context.strokeStyle = `rgba(94, 234, 212, ${(1 - distance / 150) * 0.28})`
            context.stroke()
          }
        }

        context.beginPath()
        context.arc(particle.x, particle.y, 1.5, 0, Math.PI * 2)
        context.fillStyle = 'rgba(94, 234, 212, 0.48)'
        context.fill()
      }

      if (animate) frame = requestAnimationFrame(() => draw(true))
    }

    resize()
    window.addEventListener('resize', resize)
    if (!reducedMotion) frame = requestAnimationFrame(() => draw(true))

    return () => {
      window.removeEventListener('resize', resize)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [])

  const handleClick = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  // Cursor spotlight + background parallax
  const handleMove = (e) => {
    const el = heroRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    pointerRef.current = { x, y }
    el.style.setProperty('--mx', `${x}px`)
    el.style.setProperty('--my', `${y}px`)
    el.style.setProperty('--px', ((x / rect.width - 0.5) * 2).toFixed(3))
    el.style.setProperty('--py', ((y / rect.height - 0.5) * 2).toFixed(3))
  }

  const handleLeave = () => {
    const el = heroRef.current
    if (!el) return
    pointerRef.current = { x: null, y: null }
    el.style.setProperty('--px', '0')
    el.style.setProperty('--py', '0')
  }

  const handleMagneticMove = (e) => {
    if (e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = e.currentTarget.getBoundingClientRect()
    const dx = e.clientX - rect.left - rect.width / 2
    const dy = e.clientY - rect.top - rect.height / 2
    e.currentTarget.style.setProperty('--mag-x', `${Math.max(-8, Math.min(8, dx * 0.16))}px`)
    e.currentTarget.style.setProperty('--mag-y', `${Math.max(-8, Math.min(8, dy * 0.16))}px`)
  }

  const resetMagnetic = (e) => {
    e.currentTarget.style.setProperty('--mag-x', '0px')
    e.currentTarget.style.setProperty('--mag-y', '0px')
  }

  const handleKpiMove = (e) => {
    if (e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    e.currentTarget.style.setProperty('--tilt-x', `${((0.5 - y) * 10).toFixed(2)}deg`)
    e.currentTarget.style.setProperty('--tilt-y', `${((x - 0.5) * 12).toFixed(2)}deg`)
  }

  const resetKpiTilt = (e) => {
    e.currentTarget.style.setProperty('--tilt-x', '0deg')
    e.currentTarget.style.setProperty('--tilt-y', '0deg')
  }

  let charIndex = 0

  return (
    <section
      id="top"
      className={`hero ${heroVisible ? 'is-visible' : ''}`}
      ref={heroRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="hero__bg" aria-hidden="true" />
      <canvas ref={canvasRef} className="hero__particles" aria-hidden="true" />
      <div className="hero__inner">
        <div className="hero__status">
          <span className="status-dot" aria-hidden="true" />
          Available for new opportunities &middot; Open to relocate to any locations
        </div>

        {/* <p className="hero__eyebrow">
          <span className="hero__prompt">visitor@portfolio:~$</span> whoami
        </p> */}

        <h1 className="hero__name" aria-label="Muthu Bharani P">
          {nameWords.map((word) => (
            <span className="hero__word" key={word} aria-hidden="true">
              {word.split('').map((ch, i) => (
                <span
                  className="hero__char"
                  key={i}
                  style={{ '--c': charIndex++ }}
                >
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p className={`hero__role ${decoded ? '' : 'is-decoding'}`} aria-live={decoded ? 'polite' : 'off'}>
          <span className="hero__role-text">{decoded ? text : decodeText}</span>
          <span className="hero__cursor" aria-hidden="true">|</span>
        </p>

        <p className="hero__summary">
          I’m a software engineer at Namuvi Technologies in Chennai. I build both sides of a web app: clean, responsive, accessible interfaces with React, HTML, CSS, and JavaScript, and the backend behind them with Node.js, Express, and PostgreSQL.
        </p>

        <div className="hero__actions">
          <button
            className="btn btn--primary"
            onClick={() => handleClick('projects')}
            onPointerMove={handleMagneticMove}
            onPointerLeave={resetMagnetic}
          >
            View projects
          </button>
          <button
            className="btn btn--ghost"
            onClick={() => handleClick('contact')}
            onPointerMove={handleMagneticMove}
            onPointerLeave={resetMagnetic}
          >
            Get in touch
          </button>
        </div>

        <div className="hero__kpis">
          {kpis.map((kpi, i) => (
            <div
              className="kpi"
              key={kpi.label}
              style={{ '--k': i }}
              onPointerMove={handleKpiMove}
              onPointerLeave={resetKpiTilt}
            >
              <span className="kpi__value">
                <CountUp value={kpi.value} delay={1650 + i * 110} />
              </span>
              <span className="kpi__label">{kpi.label}</span>
            </div>
          ))}
        </div>

        <p className="hero__location">
          Based in Oddanchatram, Dindigul, Tamil Nadu, India
        </p>
      </div>

      <button
        type="button"
        className="hero__scroll"
        aria-label="Scroll to content"
        onClick={() => handleClick('about')}
      >
        <span className="hero__scroll-dot" />
      </button>
    </section>
  )
}
