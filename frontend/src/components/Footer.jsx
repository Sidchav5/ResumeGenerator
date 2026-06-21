import { Link } from 'react-router-dom'
import { FiGithub, FiGlobe, FiMail } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="site-footer" id="site-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>ResumeForge AI</h3>
          <p>Build ATS-Friendly Resumes &amp; Analyze Them Instantly</p>
        </div>

        <div className="footer-info">
          <h4>Quick Links</h4>
          <p><Link to="/builder">Resume Builder</Link></p>
          <p><Link to="/analyzer">Resume Analyzer</Link></p>
        </div>

        <div className="footer-info">
          <h4>Created By</h4>
          <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Siddhesh Chavan</p>
          <p>
            <a href="mailto:csiddhesh768@gmail.com">
              <FiMail style={{ marginRight: 6, verticalAlign: 'middle' }} />
              csiddhesh768@gmail.com
            </a>
          </p>
        </div>

        <div className="footer-info">
          <h4>Connect</h4>
          <p>
            <a href="https://github.com/Sidchav5" target="_blank" rel="noopener noreferrer">
              <FiGithub style={{ marginRight: 6, verticalAlign: 'middle' }} />
              GitHub
            </a>
          </p>
          <p>
            <a href="https://siddhesh-chavan-portfolio-flame.vercel.app/" target="_blank" rel="noopener noreferrer">
              <FiGlobe style={{ marginRight: 6, verticalAlign: 'middle' }} />
              Portfolio
            </a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} ResumeForge AI — Siddhesh Chavan. All rights reserved.</span>
        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noopener noreferrer"
          className="digital-heroes-btn btn-sm"
          id="digital-heroes-footer-btn"
        >
          Built for Digital Heroes
        </a>
      </div>
    </footer>
  )
}
