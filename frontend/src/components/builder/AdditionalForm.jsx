import { FiAward, FiStar, FiUsers, FiActivity, FiPlus, FiX } from 'react-icons/fi'

function ListSection({ title, icon: Icon, items, onChange, placeholder, id }) {
  const add = () => onChange([...items, ''])
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i))
  const update = (i, val) => {
    const copy = [...items]
    copy[i] = val
    onChange(copy)
  }

  return (
    <div className="form-section" id={id}>
      <div className="form-section-header">
        <h3 className="form-section-title">
          <Icon className="icon" /> {title}
        </h3>
      </div>

      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <input
            className="form-control"
            placeholder={placeholder}
            value={item}
            onChange={e => update(i, e.target.value)}
          />
          <button className="remove-entry-btn" onClick={() => remove(i)} aria-label="Remove">
            <FiX />
          </button>
        </div>
      ))}

      <button className="add-entry-btn" onClick={add}>
        <FiPlus /> Add {title.replace(/s$/, '')}
      </button>
    </div>
  )
}

export default function AdditionalForm({ certifications, achievements, positions, extracurricular, onChangeCert, onChangeAch, onChangePos, onChangeExtra }) {
  return (
    <>
      <ListSection
        title="Certifications"
        icon={FiAward}
        items={certifications}
        onChange={onChangeCert}
        placeholder="AWS Certified Solutions Architect"
        id="certifications-section"
      />
      <ListSection
        title="Achievements"
        icon={FiStar}
        items={achievements}
        onChange={onChangeAch}
        placeholder="Won first prize in XYZ Hackathon"
        id="achievements-section"
      />
      <ListSection
        title="Positions of Responsibility"
        icon={FiUsers}
        items={positions}
        onChange={onChangePos}
        placeholder="Technical Lead — College Coding Club"
        id="positions-section"
      />
      <ListSection
        title="Extracurricular Activities"
        icon={FiActivity}
        items={extracurricular}
        onChange={onChangeExtra}
        placeholder="Competitive Programming, Open Source Contributor"
        id="extracurricular-section"
      />
    </>
  )
}
