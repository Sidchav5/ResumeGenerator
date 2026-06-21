import { useTheme } from '../../context/ThemeContext'

export default function ResumePreview({ data }) {
  const { theme } = useTheme()
  const { personalInfo, summary, education, experience, projects, skills, certifications, achievements, positions, extracurricular } = data

  const headingStyle = {
    color: theme.headingColor,
    borderBottomColor: theme.underlineColor,
  }

  const nameStyle = {
    fontFamily: theme.fontFamily,
  }

  const sectionSpacing = {
    marginBottom: `${12 * theme.spacing}px`,
  }

  return (
    <div
      className="preview-container"
      id="resume-preview"
      style={{ fontFamily: theme.fontFamily, fontSize: `${theme.fontSize}pt` }}
    >
      {/* Header */}
      <div className="preview-header" style={{ borderBottomColor: theme.headingColor }}>
        <h1 className="preview-name" style={nameStyle}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="preview-contact">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <><span>|</span><span>{personalInfo.phone}</span></>}
          {personalInfo.location && <><span>|</span><span>{personalInfo.location}</span></>}
          {personalInfo.linkedin && <><span>|</span><a href={personalInfo.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></>}
          {personalInfo.github && <><span>|</span><a href={personalInfo.github} target="_blank" rel="noreferrer">GitHub</a></>}
          {personalInfo.portfolio && <><span>|</span><a href={personalInfo.portfolio} target="_blank" rel="noreferrer">Portfolio</a></>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="preview-section" style={sectionSpacing}>
          <h2 className="preview-section-title" style={headingStyle}>Professional Summary</h2>
          <p style={{ color: '#1e293b', fontSize: '9.5pt' }}>{summary}</p>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && education.some(e => e.degree) && (
        <div className="preview-section" style={sectionSpacing}>
          <h2 className="preview-section-title" style={headingStyle}>Education</h2>
          {education.filter(e => e.degree).map((edu, i) => (
            <div className="preview-entry" key={i}>
              <div className="preview-entry-header">
                <span className="preview-entry-title">{edu.degree}</span>
                <span className="preview-entry-date">{edu.duration}</span>
              </div>
              <div className="preview-entry-subtitle">
                {edu.college}{edu.cgpa ? ` — CGPA: ${edu.cgpa}` : ''}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && experience.some(e => e.role || e.company) && (
        <div className="preview-section" style={sectionSpacing}>
          <h2 className="preview-section-title" style={headingStyle}>Experience</h2>
          {experience.filter(e => e.role || e.company).map((exp, i) => (
            <div className="preview-entry" key={i}>
              <div className="preview-entry-header">
                <span className="preview-entry-title">{exp.role}{exp.company ? ` — ${exp.company}` : ''}</span>
                <span className="preview-entry-date">{exp.duration}</span>
              </div>
              {exp.responsibilities && (
                <ul className="preview-list" style={{ listStyleType: theme.bulletStyle }}>
                  {exp.responsibilities.split('\n').filter(Boolean).map((r, j) => (
                    <li key={j}>{r}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && projects.some(p => p.name) && (
        <div className="preview-section" style={sectionSpacing}>
          <h2 className="preview-section-title" style={headingStyle}>Projects</h2>
          {projects.filter(p => p.name).map((proj, i) => (
            <div className="preview-entry" key={i}>
              <div className="preview-entry-header">
                <span className="preview-entry-title">
                  {proj.name}
                  {proj.techStack ? <span className="preview-entry-subtitle"> | {proj.techStack}</span> : ''}
                  {proj.github ? <> | <a href={proj.github} target="_blank" rel="noreferrer" style={{ color: theme.accentColor, fontSize: '9pt' }}>GitHub</a></> : ''}
                </span>
              </div>
              {proj.description && (
                <ul className="preview-list" style={{ listStyleType: theme.bulletStyle }}>
                  {proj.description.split('\n').filter(Boolean).map((d, j) => (
                    <li key={j}>{d}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {(skills.languages || skills.frameworks || skills.tools) && (
        <div className="preview-section" style={sectionSpacing}>
          <h2 className="preview-section-title" style={headingStyle}>Technical Skills</h2>
          <div className="preview-skills-grid">
            {skills.languages && <div className="preview-skill-row"><strong>Languages:</strong> {skills.languages}</div>}
            {skills.frameworks && <div className="preview-skill-row"><strong>Frameworks:</strong> {skills.frameworks}</div>}
            {skills.tools && <div className="preview-skill-row"><strong>Tools:</strong> {skills.tools}</div>}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && certifications.some(Boolean) && (
        <div className="preview-section" style={sectionSpacing}>
          <h2 className="preview-section-title" style={headingStyle}>Certifications</h2>
          <ul className="preview-simple-list" style={{ listStyleType: theme.bulletStyle }}>
            {certifications.filter(Boolean).map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>
      )}

      {/* Achievements */}
      {achievements.length > 0 && achievements.some(Boolean) && (
        <div className="preview-section" style={sectionSpacing}>
          <h2 className="preview-section-title" style={headingStyle}>Achievements</h2>
          <ul className="preview-simple-list" style={{ listStyleType: theme.bulletStyle }}>
            {achievements.filter(Boolean).map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </div>
      )}

      {/* Positions of Responsibility */}
      {positions.length > 0 && positions.some(Boolean) && (
        <div className="preview-section" style={sectionSpacing}>
          <h2 className="preview-section-title" style={headingStyle}>Positions of Responsibility</h2>
          <ul className="preview-simple-list" style={{ listStyleType: theme.bulletStyle }}>
            {positions.filter(Boolean).map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
      )}

      {/* Extracurricular */}
      {extracurricular.length > 0 && extracurricular.some(Boolean) && (
        <div className="preview-section" style={sectionSpacing}>
          <h2 className="preview-section-title" style={headingStyle}>Extracurricular Activities</h2>
          <ul className="preview-simple-list" style={{ listStyleType: theme.bulletStyle }}>
            {extracurricular.filter(Boolean).map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>
      )}
    </div>
  )
}
