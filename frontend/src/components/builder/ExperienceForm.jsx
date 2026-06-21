import { FiBriefcase, FiPlus, FiX } from 'react-icons/fi'

const EMPTY = { company: '', role: '', duration: '', responsibilities: '' }

export default function ExperienceForm({ data, onChange }) {
  const add = () => onChange([...data, { ...EMPTY }])
  const remove = (i) => onChange(data.filter((_, idx) => idx !== i))
  const update = (i, field, val) => {
    const copy = [...data]
    copy[i] = { ...copy[i], [field]: val }
    onChange(copy)
  }

  return (
    <div className="form-section" id="experience-section">
      <div className="form-section-header">
        <h3 className="form-section-title">
          <FiBriefcase className="icon" /> Experience
        </h3>
      </div>

      {data.map((exp, i) => (
        <div className="entry-card" key={i}>
          <div className="entry-card-header">
            <span className="entry-card-title">Experience {i + 1}</span>
            <button className="remove-entry-btn" onClick={() => remove(i)} aria-label="Remove">
              <FiX />
            </button>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Company</label>
              <input className="form-control" placeholder="Google" value={exp.company} onChange={e => update(i, 'company', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Role</label>
              <input className="form-control" placeholder="Software Engineer" value={exp.role} onChange={e => update(i, 'role', e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label>Duration</label>
            <input className="form-control" placeholder="Jun 2023 – Present" value={exp.duration} onChange={e => update(i, 'duration', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Responsibilities (one per line)</label>
            <textarea className="form-control" rows={3} placeholder="Led development of..." value={exp.responsibilities} onChange={e => update(i, 'responsibilities', e.target.value)} />
          </div>
        </div>
      ))}

      <button className="add-entry-btn" onClick={add} id="add-experience-btn">
        <FiPlus /> Add Experience
      </button>
    </div>
  )
}
