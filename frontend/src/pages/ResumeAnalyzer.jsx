import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import FileUpload from '../components/analyzer/FileUpload'
import ScoreCards from '../components/analyzer/ScoreCards'
import AnalysisAccordion from '../components/analyzer/AnalysisAccordion'
import { FiRefreshCw } from 'react-icons/fi'

const API_URL = import.meta.env.VITE_API_URL || ''

export default function ResumeAnalyzer() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [fileName, setFileName] = useState('')

  const handleFileSelect = async (file) => {
    // Validate file type
    const ext = file.name.split('.').pop().toLowerCase()
    if (!['pdf', 'docx'].includes(ext)) {
      setError('Please upload a PDF or DOCX file.')
      return
    }

    // Validate file size (16MB)
    if (file.size > 16 * 1024 * 1024) {
      setError('File size must be less than 16MB.')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)
    setFileName(file.name)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await axios.post(`${API_URL}/api/analyze`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 60000,
      })

      if (response.data.success) {
        setResult(response.data)
      } else {
        setError(response.data.error || 'Analysis failed.')
      }
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error)
      } else if (err.code === 'ECONNABORTED') {
        setError('Request timed out. The server may be starting up (free tier cold start). Please try again in 30 seconds.')
      } else {
        setError('Could not connect to the analysis server. Please ensure the backend is running.')
      }
    } finally {
      setLoading(false)
    }
  }

  const resetAnalysis = () => {
    setResult(null)
    setError(null)
    setFileName('')
  }

  return (
    <div className="analyzer-page" id="resume-analyzer-page">
      <div className="analyzer-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label">AI-Powered</p>
          <h1 className="section-title">Resume Analyzer</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: 8, fontSize: '1.05rem' }}>
            Upload your resume and get instant AI-powered analysis with detailed scoring
          </p>
        </motion.div>

        {/* Upload or Loading */}
        {!result && !loading && (
          <FileUpload onFileSelect={handleFileSelect} loading={loading} />
        )}

        {loading && (
          <div className="loading-overlay">
            <div className="spinner" />
            <p className="loading-text">Analyzing {fileName}...</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Extracting text, scoring, and running AI analysis
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background: 'var(--error-bg)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '16px 20px',
              marginTop: 24,
              color: '#fca5a5',
              textAlign: 'center',
            }}
          >
            <p style={{ fontWeight: 600, marginBottom: 4 }}>Analysis Error</p>
            <p style={{ fontSize: '0.9rem' }}>{error}</p>
            <button
              className="btn-outline btn-sm"
              style={{ marginTop: 12 }}
              onClick={resetAnalysis}
            >
              <FiRefreshCw /> Try Again
            </button>
          </motion.div>
        )}

        {/* Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* File info + reset */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, marginTop: 24 }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Results for <strong style={{ color: 'var(--text-primary)' }}>{fileName}</strong>
                {result.word_count && <> • {result.word_count} words</>}
              </p>
              <button className="btn-outline btn-sm" onClick={resetAnalysis} id="analyze-another-btn">
                <FiRefreshCw /> Analyze Another
              </button>
            </div>

            {/* Scores */}
            <ScoreCards scores={result.scores} />

            {/* AI Analysis Accordion */}
            <AnalysisAccordion
              analysis={result.ai_analysis}
              sections={result.sections}
            />
          </motion.div>
        )}
      </div>
    </div>
  )
}
