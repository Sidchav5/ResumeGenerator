import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown, FiCheckCircle, FiAlertCircle, FiTarget, FiFolder, FiCpu, FiStar } from 'react-icons/fi'

const SECTIONS_CONFIG = [
  { key: 'strengths', title: 'Strengths', icon: FiCheckCircle, color: '#10b981' },
  { key: 'weaknesses', title: 'Weaknesses', icon: FiAlertCircle, color: '#ef4444' },
  { key: 'ats_improvements', title: 'ATS Recommendations', icon: FiTarget, color: '#3b82f6' },
  { key: 'project_feedback', title: 'Project Feedback', icon: FiFolder, color: '#8b5cf6' },
  { key: 'skill_feedback', title: 'Skill Feedback', icon: FiCpu, color: '#f59e0b' },
  { key: 'overall_recommendations', title: 'Overall Recommendations', icon: FiStar, color: '#06b6d4' },
]

function AccordionItem({ title, icon: Icon, color, items, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen || false)

  if (!items || items.length === 0) return null

  return (
    <div className={`accordion-item ${open ? 'open' : ''}`}>
      <div className="accordion-header" onClick={() => setOpen(!open)}>
        <div className="accordion-header-left">
          <Icon className="accordion-icon" style={{ color }} />
          <span>{title}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({items.length})</span>
        </div>
        <FiChevronDown className="accordion-arrow" />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            <div className="accordion-body">
              <ul>
                {items.map((item, i) => (
                  <li key={i}>
                    <span className="bullet" style={{ background: color }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function AnalysisAccordion({ analysis, sections }) {
  if (!analysis) return null

  return (
    <div className="analysis-accordion" id="analysis-accordion">
      {/* Missing Sections */}
      {sections?.missing?.length > 0 && (
        <AccordionItem
          title="Missing Sections"
          icon={FiAlertCircle}
          color="#f59e0b"
          items={sections.missing.map(s => `Missing: ${s.charAt(0).toUpperCase() + s.slice(1)}`)}
          defaultOpen
        />
      )}

      {SECTIONS_CONFIG.map(cfg => (
        <AccordionItem
          key={cfg.key}
          title={cfg.title}
          icon={cfg.icon}
          color={cfg.color}
          items={analysis[cfg.key]}
          defaultOpen={cfg.key === 'strengths'}
        />
      ))}
    </div>
  )
}
