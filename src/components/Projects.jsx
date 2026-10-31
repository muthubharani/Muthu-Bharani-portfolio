import { useEffect, useRef, useState } from 'react'

const projects = [
    {
    domain: 'Company · SaaS Platform',
    title: 'Namuvi N1 Suite',
    subtitle: 'Work, people and business management platform, similar to Jira',
    description:
      'Worked on Namuvi N1 Suite, a Jira-style platform for managing attendance, leave, clients, employees, tasks and invoices in one place. Built React screens and backend features for task tracking, leave approvals, payslips and subscription billing.',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Attendance', 'Invoicing'],
  },
      {
    domain: 'Company · CRM Platform',
    title: 'CarQure CRM',
    subtitle: 'Car service platform connecting garages and customers',
    description:
      'Worked on CarQure, a platform that connects customers with garages for car servicing. Built back-end APIs for bookings, garage jobs, invoices, feedback and subscription plans. Added GST invoice PDFs, nearby garage matching and reports for the CRM team.',
    tags: ['Node.js', 'Express', 'PostgreSQL', 'REST APIs', 'AWS S3', 'CRM'],
  },
  
  {
    domain: 'Finance',
    title: 'BudgetBuddy',
    subtitle: 'Smart financial control web app',
    description:
      'A fully responsive personal finance app with budget tracking, expense analysis and visual insights. Mobile-first UI built with Bootstrap and custom CSS, backed by MySQL for persistent storage of records and goals, with JavaScript-driven real-time budget progress updates.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'MySQL'],
  },
  {
    domain: 'EdTech',
    title: 'Mentor Mentee System',
    subtitle: 'Academic mentoring platform',
    description:
      'Full front-end interface for a mentor-mentee management platform, with dynamic forms and dashboards for goal tracking, progress monitoring and feedback. Cross-browser compatibility achieved with CSS Flexbox and a Bootstrap grid layout. Presented at the National Conference, Arasu Engineering College, Kumbakonam.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'MySQL'],
  },
  {
    domain: 'Security · ML',
    title: 'Cyber Threat Detection System',
    subtitle: 'ML-based network security tool',
    description:
      'Co-developed a machine learning system that monitors network traffic and flags malicious activity in real time using XGBoost, with a web-facing dashboard for alert visualisation and threat reporting. Published as a research paper at an IEEE-supported international conference, Akal University, April 2026.',
    tags: ['Python', 'XGBoost', 'Machine Learning', 'Dashboard'],
  },
  {
    domain: 'HealthTech',
    title: 'Heart Disease Prediction',
    subtitle: 'Retinal eye image analysis',
    description:
      'Front-end for a non-invasive heart disease risk detection tool driven by retinal images. Designed accessible upload forms and result-display components, focused on clarity for non-technical users.',
    tags: ['Python', 'Machine Learning', 'HTML5', 'CSS3', 'JavaScript'],
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

function ProjectCard({ project, index }) {
  const [ref, inView] = useInViewOnce(0.2)

  // 3D tilt + cursor spotlight
  const handleMove = (e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty('--mx', `${x}px`)
    el.style.setProperty('--my', `${y}px`)
    el.style.setProperty('--ry', `${((x / rect.width - 0.5) * 8).toFixed(2)}deg`)
    el.style.setProperty('--rx', `${(-(y / rect.height - 0.5) * 8).toFixed(2)}deg`)
  }

  const handleLeave = (e) => {
    e.currentTarget.style.setProperty('--rx', '0deg')
    e.currentTarget.style.setProperty('--ry', '0deg')
  }

  return (
    <article
      ref={ref}
      className={`project-card ${inView ? 'is-visible' : ''}`}
      style={{ '--delay': `${(index % 2) * 150}ms` }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <span className="project-card__index" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="project-card__top">
        <span className="project-card__domain">{project.domain}</span>
      </div>
      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__subtitle">{project.subtitle}</p>
      <p className="project-card__description">{project.description}</p>
      <div className="project-card__tags">
        {project.tags.map((tag, i) => (
          <span className="tag" key={tag} style={{ '--t': i }}>
            {tag}
          </span>
        ))}
      </div>
    </article>
  )
}

export default function Projects() {
  const [headRef, headInView] = useInViewOnce(0.3)

  return (
    <section id="projects" className="section">
      <div className="section__inner">
        <div
          ref={headRef}
          className={`section__head proj-reveal ${headInView ? 'is-visible' : ''}`}
        >
          <span className="eyebrow">Projects</span>
          <h2 className="section__title">A few things I've shipped</h2>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard project={project} index={index} key={project.title} />
          ))}
        </div>
      </div>
    </section>
  )
}
