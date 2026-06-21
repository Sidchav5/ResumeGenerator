import { useState } from 'react'
import { FiSliders } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

export default function ThemeEditor() {
  const [open, setOpen] = useState(false)
  const { theme, updateTheme, applyPreset, PRESETS } = useTheme()

  const presetEntries = Object.entries(PRESETS)

  return (
    <>
      <button
        className="theme-editor-toggle"
        onClick={() => setOpen(!open)}
        title="Theme Editor"
        id="theme-editor-toggle"
      >
        <FiSliders />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="theme-editor-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            id="theme-editor-panel"
          >
            <h4 className="theme-editor-title">Theme Editor</h4>

            {/* Preset Themes */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 8 }}>
                Preset Themes
              </label>
              <div className="theme-preset-grid">
                {presetEntries.map(([name, preset]) => (
                  <button
                    key={name}
                    className={`theme-preset-btn ${theme.presetName === name ? 'active' : ''}`}
                    style={{ background: preset.headingColor }}
                    onClick={() => applyPreset(name)}
                    title={name}
                    aria-label={`Apply ${name} theme`}
                  />
                ))}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                {theme.presetName}
              </div>
            </div>

            {/* Custom Colors */}
            <div className="theme-control">
              <label>Heading Color</label>
              <input
                type="color"
                value={theme.headingColor}
                onChange={e => updateTheme({ headingColor: e.target.value })}
              />
            </div>

            <div className="theme-control">
              <label>Accent Color</label>
              <input
                type="color"
                value={theme.accentColor}
                onChange={e => updateTheme({ accentColor: e.target.value })}
              />
            </div>

            <div className="theme-control">
              <label>Underline Color</label>
              <input
                type="color"
                value={theme.underlineColor}
                onChange={e => updateTheme({ underlineColor: e.target.value })}
              />
            </div>

            {/* Font */}
            <div className="theme-control">
              <label>Font Style</label>
              <select
                value={theme.fontFamily}
                onChange={e => updateTheme({ fontFamily: e.target.value })}
              >
                <option value="'Inter', sans-serif">Inter (Default)</option>
                <option value="'Times New Roman', serif">Times New Roman</option>
                <option value="'Georgia', serif">Georgia</option>
                <option value="'Arial', sans-serif">Arial</option>
                <option value="'Calibri', sans-serif">Calibri</option>
                <option value="'Helvetica', sans-serif">Helvetica</option>
              </select>
            </div>

            {/* Spacing */}
            <div className="theme-control">
              <label>Spacing: {theme.spacing.toFixed(1)}x</label>
              <input
                type="range"
                min="0.6"
                max="1.6"
                step="0.1"
                value={theme.spacing}
                onChange={e => updateTheme({ spacing: parseFloat(e.target.value) })}
              />
            </div>

            {/* Bullet Style */}
            <div className="theme-control">
              <label>Bullet Style</label>
              <select
                value={theme.bulletStyle}
                onChange={e => updateTheme({ bulletStyle: e.target.value })}
              >
                <option value="disc">● Disc</option>
                <option value="circle">○ Circle</option>
                <option value="square">■ Square</option>
                <option value="'–'">– Dash</option>
                <option value="'›'">› Arrow</option>
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
