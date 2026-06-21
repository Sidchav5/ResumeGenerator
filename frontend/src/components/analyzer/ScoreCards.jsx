import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function ScoreCircle({ score, color, label }) {
  const [animated, setAnimated] = useState(0)
  const radius = 34
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (animated / 100) * circumference

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(score), 300)
    return () => clearTimeout(timer)
  }, [score])

  const scoreColor = score >= 70 ? '#10b981' : score >= 45 ? '#f59e0b' : '#ef4444'
  const displayColor = color || scoreColor

  return (
    <motion.div
      className="score-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="score-circle">
        <svg viewBox="0 0 76 76">
          <circle className="bg" cx="38" cy="38" r={radius} />
          <circle
            className="progress"
            cx="38"
            cy="38"
            r={radius}
            stroke={displayColor}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <span className="score-value" style={{ color: displayColor }}>{animated}</span>
      </div>
      <div className="score-label">{label}</div>
    </motion.div>
  )
}

export default function ScoreCards({ scores }) {
  if (!scores) return null

  return (
    <div className="score-cards-grid" id="score-cards">
      <ScoreCircle score={scores.overall} color="#3b82f6" label="Overall" />
      <ScoreCircle score={scores.ats} label="ATS Score" />
      <ScoreCircle score={scores.content} label="Content" />
      <ScoreCircle score={scores.formatting} label="Formatting" />
      <ScoreCircle score={scores.technical} label="Technical" />
    </div>
  )
}
