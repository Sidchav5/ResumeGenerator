import { FiAlignLeft } from 'react-icons/fi'

export default function SummaryForm({ data, onChange }) {
  return (
    <div className="form-section" id="summary-section">
      <div className="form-section-header">
        <h3 className="form-section-title">
          <FiAlignLeft className="icon" /> Professional Summary
        </h3>
      </div>
      <div className="form-group">
        <label htmlFor="summary">Summary</label>
        <textarea
          id="summary"
          className="form-control"
          rows={4}
          placeholder="A brief professional summary highlighting your expertise, experience, and career goals..."
          value={data || ''}
          onChange={e => onChange(e.target.value)}
        />
      </div>
    </div>
  )
}
