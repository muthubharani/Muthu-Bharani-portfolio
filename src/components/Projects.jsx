const projects = [
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

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section__inner">
        <div className="section__head">
          <span className="eyebrow">Projects</span>
          <h2 className="section__title">A few things I've shipped</h2>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <div className="project-card__top">
                <span className="project-card__domain">{project.domain}</span>
              </div>
              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__subtitle">{project.subtitle}</p>
              <p className="project-card__description">{project.description}</p>
              <div className="project-card__tags">
                {project.tags.map((tag) => (
                  <span className="tag" key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
