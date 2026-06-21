import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiOutlineDocumentText, HiOutlineChartBar, HiOutlineArrowRight } from 'react-icons/hi'
import { FiMail } from 'react-icons/fi'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

const MARQUEE_WORDS = [
  "ATS-Friendly",
  "AI Analysis Parser",
  "100% Free Service",
  "Professional LaTeX Design",
  "Google Gemini Flash AI",
  "Score Audited Layouts",
  "One-Click PDF Export",
  "Tailored Resume Summary",
  "Extracurricular Highlights",
  "Detailed Keyword Optimization"
]

export default function LandingPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="hero-section" id="hero">
        <div className="hero-bg-gradient" />
        <div className="hero-grid-pattern" />

        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.div variants={fadeUp} className="hero-badge">
            <span className="hero-badge-dot" />
            AI-Powered Resume Tools — 100% Free
          </motion.div>

          <motion.h1 variants={fadeUp} className="hero-title">
            <span className="hero-title-gradient">Build & Analyze</span>
            <br />
            <span className="hero-title-accent">ATS-Friendly Resumes</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="hero-subtitle">
            Build ATS-Friendly Resumes and Analyze Them Instantly with AI-powered
            insights. Professional LaTeX templates, real-time preview, and detailed scoring.
          </motion.p>

          <motion.div variants={fadeUp} className="hero-cta-group">
            <Link to="/builder" className="btn-primary-glow" id="hero-builder-btn">
              <HiOutlineDocumentText />
              Start Building
            </Link>
            <Link to="/analyzer" className="btn-outline" id="hero-analyzer-btn">
              <HiOutlineChartBar />
              Analyze Resume
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="hero-creator">
            <span className="hero-creator-name">Siddhesh Chavan</span>
            <a href="mailto:csiddhesh768@gmail.com" className="hero-creator-email">
              <FiMail style={{ marginRight: 4, verticalAlign: 'middle' }} />
              csiddhesh768@gmail.com
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Sliding Keywords Marquee ── */}
      <section className="marquee-section" id="keywords-marquee">
        <div className="marquee-container">
          <div className="marquee-content">
            {MARQUEE_WORDS.map((word, idx) => (
              <div key={idx} className="marquee-item">
                <span /> <strong>{word}</strong>
              </div>
            ))}
          </div>
          {/* Duplicate content to make the loop infinite and seamless */}
          <div className="marquee-content" aria-hidden="true">
            {MARQUEE_WORDS.map((word, idx) => (
              <div key={`dup-${idx}`} className="marquee-item">
                <span /> <strong>{word}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="services-section" id="services">
        <div className="section-header">
          <motion.p
            className="section-label"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Our Tools
          </motion.p>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Everything You Need
          </motion.h2>
        </div>

        <div className="services-grid">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/builder" className="service-card" id="service-builder-card">
              <div className="service-icon builder">
                <HiOutlineDocumentText />
              </div>
              <h3>Resume Builder</h3>
              <p>
                Create stunning, ATS-friendly resumes with our intuitive builder.
                Live preview, LaTeX templates, customizable themes, and one-click PDF export.
              </p>
              <span className="card-arrow">
                Get Started <HiOutlineArrowRight />
              </span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Link to="/analyzer" className="service-card" id="service-analyzer-card">
              <div className="service-icon analyzer">
                <HiOutlineChartBar />
              </div>
              <h3>Resume Analyzer</h3>
              <p>
                Upload your resume and get instant AI-powered analysis. ATS scoring,
                section detection, keyword suggestions, and actionable improvement tips.
              </p>
              <span className="card-arrow">
                Analyze Now <HiOutlineArrowRight />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
