const certifications = [
  'AWS Certified Cloud Practitioner — Global Certification',
  'Front End Development — Great Learning',
  'Introduction to Java',
]

const publications = [
  {
    title: '"A Machine Learning-Based Approach for Cyber Threat Detection and Prevention for IT Industry"',
    detail: 'Presented at the IEEE-supported International Conference on Connected Intelligence for Industrial Applications, Akal University, April 2026.',
  },
]

const achievements = [
  'Participated in AI CONCLAVE 1.0 Hackathon, Kongu Engineering College, Erode.',
  "Presented the Mentor Mentee System project at the National Conference, Arasu Engineering College, Kumbakonam.",
  'March Past — 1st Prize (Independence Day 2023), 2nd Prize (Sports Day 2024), 3rd Prize (Republic Day 2024 & Sports Day 2025).',
]

const languages = [
  { name: 'English', level: 'Proficient' },
  { name: 'Tamil', level: 'Native' },
]

export default function Credentials() {
  return (
    <section id="credentials" className="section">
      <div className="section__inner">
        <div className="section__head">
          <span className="eyebrow">Credentials</span>
          <h2 className="section__title">Certifications, research &amp; recognition</h2>
        </div>

        <div className="credentials-grid">
          <div className="credential-card">
            <h3 className="credential-card__title">Certifications</h3>
            <ul className="credential-card__list">
              {certifications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="credential-card">
            <h3 className="credential-card__title">Publications &amp; research</h3>
            <ul className="credential-card__list">
              {publications.map((pub) => (
                <li key={pub.title}>
                  {pub.title}
                  <span className="credential-card__detail">{pub.detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="credential-card">
            <h3 className="credential-card__title">Achievements &amp; activities</h3>
            <ul className="credential-card__list">
              {achievements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="languages">
          <span className="languages__label">Languages</span>
          <div className="languages__items">
            {languages.map((lang) => (
              <span className="tag tag--muted" key={lang.name}>
                {lang.name} &middot; {lang.level}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
