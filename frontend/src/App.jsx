import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import ResumeBuilder from './pages/ResumeBuilder'
import ResumeAnalyzer from './pages/ResumeAnalyzer'

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/builder" element={<ResumeBuilder />} />
        <Route path="/analyzer" element={<ResumeAnalyzer />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Footer />} />
        <Route path="/analyzer" element={<Footer />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
