import { useState, useMemo } from 'react'
import { FiDownload, FiCopy, FiCode, FiEye, FiZoomIn, FiZoomOut, FiCheck } from 'react-icons/fi'
import PersonalInfoForm from '../components/builder/PersonalInfoForm'
import SummaryForm from '../components/builder/SummaryForm'
import EducationForm from '../components/builder/EducationForm'
import ExperienceForm from '../components/builder/ExperienceForm'
import ProjectsForm from '../components/builder/ProjectsForm'
import SkillsForm from '../components/builder/SkillsForm'
import AdditionalForm from '../components/builder/AdditionalForm'
import ResumePreview from '../components/builder/ResumePreview'
import LatexCodeView from '../components/builder/LatexCodeView'
import ThemeEditor from '../components/builder/ThemeEditor'
import { generateLatex } from '../utils/latexGenerator'
import { downloadPDF, downloadLatex, copyLatexCode } from '../utils/exportUtils'
import { useTheme } from '../context/ThemeContext'

const INITIAL_STATE = {
  personalInfo: { fullName: '', email: '', phone: '', linkedin: '', github: '', portfolio: '', location: '' },
  summary: '',
  education: [{ degree: '', college: '', cgpa: '', duration: '' }],
  experience: [],
  projects: [],
  skills: { languages: '', frameworks: '', tools: '' },
  certifications: [],
  achievements: [],
  positions: [],
  extracurricular: [],
}

export default function ResumeBuilder() {
  const [data, setData] = useState(INITIAL_STATE)
  const [viewMode, setViewMode] = useState('preview') // 'preview' | 'latex'
  const [zoom, setZoom] = useState(80)
  const [copied, setCopied] = useState(false)
  const { theme } = useTheme()

  const latexCode = useMemo(() => generateLatex(data, theme), [data, theme])

  const update = (key, value) => setData(prev => ({ ...prev, [key]: value }))

  const handleCopy = async () => {
    await copyLatexCode(latexCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="builder-page" id="resume-builder-page">
      {/* Toolbar */}
      <div className="builder-toolbar">
        <div className="builder-toolbar-group">
          <button
            className={`toggle-btn ${viewMode === 'preview' ? 'active' : ''}`}
            onClick={() => setViewMode('preview')}
            id="toggle-preview"
          >
            <FiEye style={{ marginRight: 4 }} /> Preview
          </button>
          <button
            className={`toggle-btn ${viewMode === 'latex' ? 'active' : ''}`}
            onClick={() => setViewMode('latex')}
            id="toggle-latex"
          >
            <FiCode style={{ marginRight: 4 }} /> LaTeX Code
          </button>
        </div>

        {viewMode === 'preview' && (
          <div className="zoom-controls">
            <button className="btn-icon" onClick={() => setZoom(z => Math.max(40, z - 10))} aria-label="Zoom out" id="zoom-out-btn">
              <FiZoomOut />
            </button>
            <span className="zoom-label">{zoom}%</span>
            <button className="btn-icon" onClick={() => setZoom(z => Math.min(150, z + 10))} aria-label="Zoom in" id="zoom-in-btn">
              <FiZoomIn />
            </button>
          </div>
        )}

        <div className="builder-toolbar-group">
          <button className="btn-primary-glow btn-sm" onClick={downloadPDF} id="download-pdf-btn">
            <FiDownload /> Download PDF
          </button>
          <button className="btn-outline btn-sm" onClick={() => downloadLatex(latexCode)} id="download-latex-btn">
            <FiDownload /> Download LaTeX
          </button>
          <button className="btn-outline btn-sm" onClick={handleCopy} id="copy-latex-btn">
            {copied ? <><FiCheck /> Copied!</> : <><FiCopy /> Copy LaTeX</>}
          </button>
        </div>
      </div>

      {/* Split Layout */}
      <div className="builder-layout">
        {/* Left — Form */}
        <div className="builder-form-panel">
          <PersonalInfoForm data={data.personalInfo} onChange={v => update('personalInfo', v)} />
          <SummaryForm data={data.summary} onChange={v => update('summary', v)} />
          <EducationForm data={data.education} onChange={v => update('education', v)} />
          <ExperienceForm data={data.experience} onChange={v => update('experience', v)} />
          <ProjectsForm data={data.projects} onChange={v => update('projects', v)} />
          <SkillsForm data={data.skills} onChange={v => update('skills', v)} />
          <AdditionalForm
            certifications={data.certifications}
            achievements={data.achievements}
            positions={data.positions}
            extracurricular={data.extracurricular}
            onChangeCert={v => update('certifications', v)}
            onChangeAch={v => update('achievements', v)}
            onChangePos={v => update('positions', v)}
            onChangeExtra={v => update('extracurricular', v)}
          />
        </div>

        {/* Right — Preview or LaTeX */}
        <div className="builder-preview-panel">
          {viewMode === 'preview' ? (
            <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center', width: '100%' }}>
              <ResumePreview data={data} />
            </div>
          ) : (
            <LatexCodeView code={latexCode} />
          )}
        </div>
      </div>

      {/* Theme Editor FAB */}
      <ThemeEditor />
    </div>
  )
}
