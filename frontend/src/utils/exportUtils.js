/**
 * Export utilities for Resume Builder.
 * - PDF download via html2pdf.js
 * - LaTeX file download
 * - Copy LaTeX to clipboard
 */

export async function downloadPDF() {
  const element = document.getElementById('resume-preview')
  if (!element) return

  // Temporarily add class to override screen styling (like gradient borders) for clean PDF export
  element.classList.add('pdf-export-mode')

  // Dynamically import html2pdf to keep initial bundle small
  const html2pdf = (await import('html2pdf.js')).default

  const opt = {
    margin: 0,
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2.5,
      useCORS: true,
      letterRendering: true,
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
    },
  }

  try {
    await html2pdf().set(opt).from(element).save()
  } catch (error) {
    console.error('Error generating PDF:', error)
  } finally {
    // Remove the override class to restore original on-screen styling
    element.classList.remove('pdf-export-mode')
  }
}

export function downloadLatex(latexCode, filename = 'resume.tex') {
  const blob = new Blob([latexCode], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export async function copyLatexCode(latexCode) {
  try {
    await navigator.clipboard.writeText(latexCode)
    return true
  } catch {
    // Fallback
    const textarea = document.createElement('textarea')
    textarea.value = latexCode
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    return true
  }
}
