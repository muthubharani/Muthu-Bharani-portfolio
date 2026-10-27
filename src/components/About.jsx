const softSkills = ['Time management', 'Adaptability', 'Teamwork', 'Problem solving']

export default function About() {
  return (
    <section id="about" className="section">
      <div className="section__inner about">
        <div className="section__head">
          <span className="eyebrow">Overview</span>
          <h2 className="section__title">A software engineer who enjoys turning ideas into real-world solutions.</h2>
        </div>

        <div className="about__grid">
          <p className="about__text">
            I'm a passionate Software Developer with a B.Tech in Information Technology. I work with React, JavaScript, Node.js, Express.js, MySQL, and AWS to build responsive websites and web applications. I'm interested in frontend, backend, and full-stack development, and I enjoy learning new technologies and solving real-world problems. I'm open to relocation anywhere in India for the right opportunity.
          </p>

          <div className="now-card">
            <div className="now-card__row">
              <span className="now-card__label">status</span>
              <span className="now-card__value">
                <span className="status-dot status-dot--small" aria-hidden="true" /> Employed, open to new roles
              </span>
            </div>
            <div className="now-card__row">
              <span className="now-card__label">role</span>
              <span className="now-card__value">Software Engineer</span>
            </div>
            <div className="now-card__row">
              <span className="now-card__label">company</span>
              <span className="now-card__value">Namuvi Technologies Pvt. Ltd., Chennai</span>
            </div>
            <div className="now-card__row">
              <span className="now-card__label">since</span>
              <span className="now-card__value">April 2026</span>
            </div>
            <div className="now-card__row">
              <span className="now-card__label">target</span>
              <span className="now-card__value">Front-End Developer, Coimbatore</span>
            </div>
            <div className="now-card__divider" />
            <div className="now-card__tags">
              {softSkills.map((skill) => (
                <span className="tag tag--muted" key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
