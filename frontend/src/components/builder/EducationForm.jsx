import { FiBookOpen, FiPlus, FiX } from 'react-icons/fi'

const EMPTY = { degree: '', college: '', cgpa: '', duration: '' }

export default function EducationForm({ data, onChange }) {
  const add = () => onChange([...data, { ...EMPTY }])
  const remove = (i) => onChange(data.filter((_, idx) => idx !== i))
  const update = (i, field, val) => {
    const copy = [...data]
    copy[i] = { ...copy[i], [field]: val }
    onChange(copy)
  }

  return (
    <div className="form-section" id="education-section">
      <div className="form-section-header">
        <h3 className="form-section-title">
          <FiBookOpen className="icon" /> Education
        </h3>
      </div>

      {data.map((edu, i) => (
        <div className="entry-card" key={i}>
          <div className="entry-card-header">
            <span className="entry-card-title">Education {i + 1}</span>
            <button className="remove-entry-btn" onClick={() => remove(i)} aria-label="Remove">
              <FiX />
            </button>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Degree</label>
              <input className="form-control" placeholder="B.Tech in Computer Science" value={edu.degree} onChange={e => update(i, 'degree', e.target.value)} />
            </div>
            <div className="form-group">
              <label>College / University</label>
              <input className="form-control" placeholder="IIT Bombay" value={edu.college} onChange={e => update(i, 'college', e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>CGPA / Percentage</label>
              <input className="form-control" placeholder="9.2" value={edu.cgpa} onChange={e => update(i, 'cgpa', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Duration</label>
              <input className="form-control" placeholder="2021 – 2025" value={edu.duration} onChange={e => update(i, 'duration', e.target.value)} />
            </div>
          </div>
        </div>
      ))}

      <button className="add-entry-btn" onClick={add} id="add-education-btn">
        <FiPlus /> Add Education
      </button>
    </div>
  )
}
