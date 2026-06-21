import { FiUser } from 'react-icons/fi'

export default function PersonalInfoForm({ data, onChange }) {
  const update = (field, value) => onChange({ ...data, [field]: value })

  return (
    <div className="form-section" id="personal-info-section">
      <div className="form-section-header">
        <h3 className="form-section-title">
          <FiUser className="icon" /> Personal Information
        </h3>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="fullName">Full Name *</label>
          <input
            id="fullName"
            className="form-control"
            placeholder="Siddhesh Chavan"
            value={data.fullName || ''}
            onChange={e => update('fullName', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            type="email"
            className="form-control"
            placeholder="you@example.com"
            value={data.email || ''}
            onChange={e => update('email', e.target.value)}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            className="form-control"
            placeholder="+91 98765 43210"
            value={data.phone || ''}
            onChange={e => update('phone', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            className="form-control"
            placeholder="Mumbai, India"
            value={data.location || ''}
            onChange={e => update('location', e.target.value)}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="linkedin">LinkedIn URL</label>
          <input
            id="linkedin"
            className="form-control"
            placeholder="https://linkedin.com/in/username"
            value={data.linkedin || ''}
            onChange={e => update('linkedin', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="github">GitHub URL</label>
          <input
            id="github"
            className="form-control"
            placeholder="https://github.com/username"
            value={data.github || ''}
            onChange={e => update('github', e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="portfolio">Portfolio URL</label>
        <input
          id="portfolio"
          className="form-control"
          placeholder="https://yourportfolio.com"
          value={data.portfolio || ''}
          onChange={e => update('portfolio', e.target.value)}
        />
      </div>
    </div>
  )
}
