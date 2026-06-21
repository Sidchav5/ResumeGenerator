import { FiUploadCloud } from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function FileUpload({ onFileSelect, loading }) {
  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const file = e.dataTransfer?.files?.[0]
    if (file) onFileSelect(file)
  }

  const handleChange = (e) => {
    const file = e.target.files?.[0]
    if (file) onFileSelect(file)
  }

  return (
    <motion.div
      className="upload-zone"
      onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('drag-over') }}
      onDragLeave={e => e.currentTarget.classList.remove('drag-over')}
      onDrop={handleDrop}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      id="upload-zone"
    >
      <input
        type="file"
        accept=".pdf,.docx"
        onChange={handleChange}
        disabled={loading}
        id="file-input"
      />
      <div className="upload-zone-icon">
        <FiUploadCloud />
      </div>
      <h3>
        {loading ? 'Analyzing your resume...' : 'Drop your resume here'}
      </h3>
      <p>
        {loading ? 'This may take a few seconds' : 'Supports PDF and DOCX files • Max 16MB'}
      </p>
    </motion.div>
  )
}
