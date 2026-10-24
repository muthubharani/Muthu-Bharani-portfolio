const groups = [
  {
    label: 'Front-end',
    items: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Bootstrap', 'React JS'],
  },
  {
    label: 'Runtime & languages',
    items: ['Node.js', 'Java'],
  },
  {
    label: 'Databases',
    items: ['MySQL', 'MongoDB'],
  },
  {
    label: 'Cloud & data',
    items: ['AWS (Cloud Practitioner)', 'Power BI'],
  },
  {
    label: 'Practices',
    items: ['Responsive design', 'Cross-browser compatibility', 'Mobile-first design'],
  },
  {
    label: 'Tools',
    items: ['Git', 'GitHub', 'VS Code', 'Excel'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="section__inner">
        <div className="section__head">
          <span className="eyebrow">Stack</span>
          <h2 className="section__title">Tools I reach for</h2>
        </div>

        <div className="skills-grid">
          {groups.map((group) => (
            <div className="skill-card" key={group.label}>
              <span className="skill-card__label">{group.label}</span>
              <div className="skill-card__tags">
                {group.items.map((item) => (
                  <span className="tag" key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
