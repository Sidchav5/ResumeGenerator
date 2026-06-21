import { FiCpu } from 'react-icons/fi'

export default function SkillsForm({ data, onChange }) {
  const update = (field, val) => onChange({ ...data, [field]: val })

  return (
    <div className="form-section" id="skills-section">
      <div className="form-section-header">
        <h3 className="form-section-title">
          <FiCpu className="icon" /> Technical Skills
        </h3>
      </div>

      <div className="form-group">
        <label htmlFor="languages">Programming Languages</label>
        <input
          id="languages"
          className="form-control"
          placeholder="Python, JavaScript, Java, C++"
          value={data.languages || ''}
          onChange={e => update('languages', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="frameworks">Frameworks & Libraries</label>
        <input
          id="frameworks"
          className="form-control"
          placeholder="React, Flask, Node.js, TensorFlow"
          value={data.frameworks || ''}
          onChange={e => update('frameworks', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="tools">Tools & Platforms</label>
        <input
          id="tools"
          className="form-control"
          placeholder="Git, Docker, AWS, VS Code"
          value={data.tools || ''}
          onChange={e => update('tools', e.target.value)}
        />
      </div>
    </div>
  )
}
