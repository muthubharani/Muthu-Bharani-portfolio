const roles = [
  {
    period: 'Apr 2026 — Present',
    title: 'Software Engineer (Full-Time)',
    org: 'Namuvi Technologies Private Limited, Chennai',
    points: [
      'Working on front-end development tasks using modern web technologies for client-facing applications.',
      'Collaborating with cross-functional teams to develop and maintain responsive web interfaces.',
      'Applying HTML5, CSS3 and JavaScript best practices for scalable, maintainable code.',
    ],
  },
  {
    period: 'Feb 2026 — Mar 2026',
    title: 'Software Engineer Intern',
    org: 'Namuvi Technologies Private Limited, Chennai',
    points: [
      'Gained industry exposure in full-stack development within a professional team environment.',
      'Contributed to web development projects involving front-end design and database integration.',
      'Built and tested web components under real-world project constraints.',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="section__inner">
        <div className="section__head">
          <span className="eyebrow">Experience</span>
          <h2 className="section__title">Where I've been building</h2>
        </div>

        <div className="timeline">
          {roles.map((role) => (
            <article className="timeline__item" key={role.period}>
              <div className="timeline__marker" aria-hidden="true" />
              <div className="timeline__content">
                <span className="timeline__period">{role.period}</span>
                <h3 className="timeline__title">{role.title}</h3>
                <p className="timeline__org">{role.org}</p>
                <ul className="timeline__points">
                  {role.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
