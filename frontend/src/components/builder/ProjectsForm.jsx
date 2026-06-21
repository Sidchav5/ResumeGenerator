import { FiFolder, FiPlus, FiX } from 'react-icons/fi'

const EMPTY = { name: '', description: '', techStack: '', github: '' }

export default function ProjectsForm({ data, onChange }) {
  const add = () => onChange([...data, { ...EMPTY }])
  const remove = (i) => onChange(data.filter((_, idx) => idx !== i))
  const update = (i, field, val) => {
    const copy = [...data]
    copy[i] = { ...copy[i], [field]: val }
    onChange(copy)
  }

  return (
    <div className="form-section" id="projects-section">
      <div className="form-section-header">
        <h3 className="form-section-title">
          <FiFolder className="icon" /> Projects
        </h3>
      </div>

      {data.map((proj, i) => (
        <div className="entry-card" key={i}>
          <div className="entry-card-header">
            <span className="entry-card-title">Project {i + 1}</span>
            <button className="remove-entry-btn" onClick={() => remove(i)} aria-label="Remove">
              <FiX />
            </button>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Project Name</label>
              <input className="form-control" placeholder="ResumeForge AI" value={proj.name} onChange={e => update(i, 'name', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Tech Stack</label>
              <input className="form-control" placeholder="React, Flask, Python" value={proj.techStack} onChange={e => update(i, 'techStack', e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label>Description (one bullet per line)</label>
            <textarea className="form-control" rows={3} placeholder="Built a full-stack application..." value={proj.description} onChange={e => update(i, 'description', e.target.value)} />
          </div>
          <div className="form-group">
            <label>GitHub Link</label>
            <input className="form-control" placeholder="https://github.com/..." value={proj.github} onChange={e => update(i, 'github', e.target.value)} />
          </div>
        </div>
      ))}

      <button className="add-entry-btn" onClick={add} id="add-project-btn">
        <FiPlus /> Add Project
      </button>
    </div>
  )
}
