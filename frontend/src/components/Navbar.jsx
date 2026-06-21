import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiOutlineDocumentText } from 'react-icons/hi'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { theme, cycleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const isActive = (path) => location.pathname === path ? 'active' : ''

  return (
    <nav className={`navbar-glass ${scrolled ? 'scrolled' : ''}`} id="main-navbar">
      <Link to="/" className="nav-brand">
        <div className="nav-brand-icon">
          <HiOutlineDocumentText />
        </div>
        <span>ResumeForge AI</span>
      </Link>

      <button
        className="nav-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
        id="nav-toggle-btn"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><Link to="/" className={isActive('/')} id="nav-home">Home</Link></li>
        <li><Link to="/builder" className={isActive('/builder')} id="nav-builder">Resume Builder</Link></li>
        <li><Link to="/analyzer" className={isActive('/analyzer')} id="nav-analyzer">Resume Analyzer</Link></li>
        <li style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <button
            className="btn-icon"
            onClick={cycleTheme}
            title={`Theme: ${theme.presetName}. Click to change theme.`}
            aria-label="Cycle theme"
            id="cycle-theme-btn"
            style={{
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              border: '1px solid var(--glass-border)',
              background: 'var(--glass-bg)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
              margin: '0 8px',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1) rotate(15deg)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
          >
            {/* Custom SVG Palette Icon */}
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: theme.headingColor }}
            >
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14 3 16 4.5 17.5C6 19 6.5 20 6.5 22H12Z" />
              <circle cx="7.5" cy="10.5" r="1" fill="currentColor" />
              <circle cx="11.5" cy="7.5" r="1" fill="currentColor" />
              <circle cx="16.5" cy="9.5" r="1" fill="currentColor" />
              <circle cx="15.5" cy="14.5" r="1" fill="currentColor" />
            </svg>
          </button>
        </li>
        <li>
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="digital-heroes-btn"
            id="digital-heroes-nav-btn"
          >
            Built for Digital Heroes
          </a>
        </li>
      </ul>
    </nav>
  )
}
