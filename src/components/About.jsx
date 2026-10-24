const softSkills = ['Time management', 'Adaptability', 'Teamwork', 'Problem solving']

export default function About() {
  return (
    <section id="about" className="section">
      <div className="section__inner about">
        <div className="section__head">
          <span className="eyebrow">Overview</span>
          <h2 className="section__title">A front-end developer who likes turning data into interfaces</h2>
        </div>

        <div className="about__grid">
          <p className="about__text">
            I'm a results-driven front-end developer working with HTML5, CSS3, JavaScript, Bootstrap
            and React. I graduated with a B.Tech in Information Technology (CGPA 7.5) from M Kumarasamy
            College of Engineering, and I'm an AWS Certified Cloud Practitioner. Alongside web development,
            I co-authored an IEEE-presented research paper on machine learning for cyber threat detection.
            I enjoy building responsive, cross-browser interfaces &mdash; especially dashboards, forms and
            data-heavy screens &mdash; and I'm looking for a front-end role in Coimbatore.
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
