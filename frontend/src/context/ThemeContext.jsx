import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

const PRESETS = {
  'Deep Dark': {
    headingColor: '#3b82f6',
    accentColor: '#7c3aed',
    underlineColor: '#3b82f6',
    bgDark: '#070a13',
    bgCard: 'rgba(15, 23, 42, 0.85)',
    bgSurface: 'rgba(30, 41, 59, 0.65)',
    textPrimary: '#f8fafc',
    textSecondary: '#cbd5e1',
    textMuted: '#64748b',
    borderDark: 'rgba(255, 255, 255, 0.08)',
    glow1: 'rgba(37, 99, 235, 0.08)',
    glow2: 'rgba(124, 58, 237, 0.08)',
  },
  'Sunset Aura': {
    headingColor: '#ec4899',
    accentColor: '#f43f5e',
    underlineColor: '#ec4899',
    bgDark: '#120516',
    bgCard: 'rgba(30, 10, 40, 0.85)',
    bgSurface: 'rgba(45, 15, 60, 0.65)',
    textPrimary: '#fdf4ff',
    textSecondary: '#f5d0fe',
    textMuted: '#a21caf',
    borderDark: 'rgba(255, 255, 255, 0.08)',
    glow1: 'rgba(236, 72, 153, 0.08)',
    glow2: 'rgba(244, 63, 94, 0.08)',
  },
  'Ethereal Light': {
    headingColor: '#4f46e5',
    accentColor: '#06b6d4',
    underlineColor: '#4f46e5',
    bgDark: '#f8fafc',
    bgCard: 'rgba(255, 255, 255, 0.85)',
    bgSurface: 'rgba(241, 245, 249, 0.95)',
    textPrimary: '#0f172a',
    textSecondary: '#334155',
    textMuted: '#64748b',
    borderDark: 'rgba(0, 0, 0, 0.08)',
    glow1: 'rgba(79, 70, 229, 0.05)',
    glow2: 'rgba(6, 182, 212, 0.05)',
  },
}

const DEFAULT_THEME = {
  headingColor: '#3b82f6',
  accentColor: '#7c3aed',
  underlineColor: '#3b82f6',
  fontFamily: "'Inter', sans-serif",
  fontSize: 10,
  spacing: 1.0,
  bulletStyle: 'disc',
  presetName: 'Deep Dark',
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(DEFAULT_THEME)

  const updateTheme = (updates) => {
    setTheme(prev => {
      // If updating colors directly, ensure we track custom presets
      return { ...prev, ...updates }
    })
  }

  const applyPreset = (name) => {
    const preset = PRESETS[name]
    if (preset) {
      setTheme(prev => ({ ...prev, ...preset, presetName: name }))
    }
  }

  const cycleTheme = () => {
    const keys = Object.keys(PRESETS)
    const currentIdx = keys.indexOf(theme.presetName)
    const nextIdx = (currentIdx + 1) % keys.length
    applyPreset(keys[nextIdx])
  }

  useEffect(() => {
    const p = PRESETS[theme.presetName] || PRESETS['Deep Dark']

    // Accent colors
    document.documentElement.style.setProperty('--primary', p.headingColor)
    document.documentElement.style.setProperty('--primary-dark', p.accentColor)
    document.documentElement.style.setProperty('--accent', p.accentColor)
    document.documentElement.style.setProperty('--primary-glow', `${p.headingColor}66`)
    document.documentElement.style.setProperty(
      '--primary-gradient',
      `linear-gradient(135deg, ${p.headingColor}, ${p.accentColor}, ${p.headingColor})`
    )

    // Backgrounds
    document.documentElement.style.setProperty('--bg-dark', p.bgDark)
    document.documentElement.style.setProperty('--bg-card', p.bgCard)
    document.documentElement.style.setProperty('--bg-surface', p.bgSurface)

    // Texts and borders
    document.documentElement.style.setProperty('--text-primary', p.textPrimary)
    document.documentElement.style.setProperty('--text-secondary', p.textSecondary)
    document.documentElement.style.setProperty('--text-muted', p.textMuted)
    document.documentElement.style.setProperty('--border-dark', p.borderDark)

    // Ambient glow gradients
    document.documentElement.style.setProperty('--glow-1', p.glow1)
    document.documentElement.style.setProperty('--glow-2', p.glow2)

    // Glassmorphism adaptations
    if (theme.presetName === 'Ethereal Light') {
      document.documentElement.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.45)')
      document.documentElement.style.setProperty('--glass-border', 'rgba(0, 0, 0, 0.08)')
      document.documentElement.style.setProperty('--glass-hover', 'rgba(255, 255, 255, 0.65)')
      document.documentElement.style.setProperty('--glass-shadow', '0 8px 32px rgba(0, 0, 0, 0.06)')
    } else {
      document.documentElement.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.03)')
      document.documentElement.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.08)')
      document.documentElement.style.setProperty('--glass-hover', 'rgba(255, 255, 255, 0.06)')
      document.documentElement.style.setProperty('--glass-shadow', '0 8px 32px rgba(0, 0, 0, 0.4)')
    }
  }, [theme.presetName])

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, applyPreset, cycleTheme, PRESETS }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
