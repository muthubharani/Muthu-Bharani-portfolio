const records = [
  {
    score: '7.5',
    scoreLabel: 'CGPA',
    title: 'B.Tech in Information Technology',
    place: 'M Kumarasamy College of Engineering, Karur',
    period: '2022 — 2026',
  },
  {
    score: '86.5%',
    scoreLabel: 'Aggregate',
    title: 'Higher Secondary (HSC)',
    place: 'Christian Matriculation Higher Secondary School, Oddanchatram',
    period: '2021 — 2022',
  },
  {
    score: '75%',
    scoreLabel: 'Aggregate',
    title: 'SSLC',
    place: 'Christian Matriculation Higher Secondary School, Oddanchatram',
    period: '2019 — 2020',
  },
]

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="section__inner">
        <div className="section__head">
          <span className="eyebrow">Education</span>
          <h2 className="section__title">Academic record</h2>
        </div>

        <div className="education-grid">
          {records.map((record) => (
            <div className="education-card" key={record.title}>
              <div className="education-card__score">
                <span className="education-card__number">{record.score}</span>
                <span className="education-card__score-label">{record.scoreLabel}</span>
              </div>
              <div className="education-card__body">
                <h3 className="education-card__title">{record.title}</h3>
                <p className="education-card__place">{record.place}</p>
                <span className="education-card__period">{record.period}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
