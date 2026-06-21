/**
 * Client-side LaTeX resume generator.
 * Produces a complete .tex document from structured form data.
 */

function esc(text) {
  if (!text) return ''
  return text
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/&/g, '\\&')
    .replace(/%/g, '\\%')
    .replace(/\$/g, '\\$')
    .replace(/#/g, '\\#')
    .replace(/_/g, '\\_')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}')
}

export function generateLatex(data, theme = {}) {
  const { personalInfo = {}, summary = '', education = [], experience = [], projects = [], skills = {}, certifications = [], achievements = [], positions = [], extracurricular = [] } = data
  const hColor = (theme.headingColor || '#2563eb').replace('#', '')

  const lines = []

  // Preamble
  lines.push(`\\documentclass[a4paper,11pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{lmodern}
\\usepackage[margin=0.75in]{geometry}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{xcolor}
\\usepackage{fontawesome5}

% Colors
\\definecolor{headingcolor}{HTML}{${hColor}}
\\definecolor{linkcolor}{HTML}{${hColor}}

% Section formatting
\\titleformat{\\section}{\\large\\bfseries\\color{headingcolor}}{}{0em}{}[\\titlerule]
\\titlespacing*{\\section}{0pt}{12pt}{6pt}

\\pagestyle{empty}
\\hypersetup{colorlinks=true, linkcolor=linkcolor, urlcolor=linkcolor}

\\begin{document}
`)

  // Header
  const name = esc(personalInfo.fullName || 'Your Name')
  lines.push(`\\begin{center}`)
  lines.push(`  {\\LARGE\\bfseries ${name}} \\\\[4pt]`)

  const contact = []
  if (personalInfo.email) contact.push(`\\faEnvelope\\ \\href{mailto:${esc(personalInfo.email)}}{${esc(personalInfo.email)}}`)
  if (personalInfo.phone) contact.push(`\\faPhone\\ ${esc(personalInfo.phone)}`)
  if (personalInfo.location) contact.push(`\\faMapMarker\\ ${esc(personalInfo.location)}`)
  if (contact.length) lines.push(`  ${contact.join(' $|$ ')} \\\\[2pt]`)

  const links = []
  if (personalInfo.linkedin) links.push(`\\faLinkedin\\ \\href{${esc(personalInfo.linkedin)}}{LinkedIn}`)
  if (personalInfo.github) links.push(`\\faGithub\\ \\href{${esc(personalInfo.github)}}{GitHub}`)
  if (personalInfo.portfolio) links.push(`\\faGlobe\\ \\href{${esc(personalInfo.portfolio)}}{Portfolio}`)
  if (links.length) lines.push(`  ${links.join(' $|$ ')}`)

  lines.push(`\\end{center}\n`)

  // Summary
  if (summary.trim()) {
    lines.push(`\\section{Professional Summary}`)
    lines.push(`${esc(summary)}\n`)
  }

  // Education
  if (education.some(e => e.degree)) {
    lines.push(`\\section{Education}`)
    education.filter(e => e.degree).forEach(edu => {
      lines.push(`\\textbf{${esc(edu.degree)}} \\hfill ${esc(edu.duration)} \\\\`)
      const cgpa = edu.cgpa ? ` -- CGPA: ${esc(edu.cgpa)}` : ''
      lines.push(`${esc(edu.college)}${cgpa}\n`)
    })
  }

  // Experience
  if (experience.some(e => e.role || e.company)) {
    lines.push(`\\section{Experience}`)
    experience.filter(e => e.role || e.company).forEach(exp => {
      lines.push(`\\textbf{${esc(exp.role)}} -- ${esc(exp.company)} \\hfill ${esc(exp.duration)}`)
      if (exp.responsibilities) {
        const items = exp.responsibilities.split('\n').filter(Boolean)
        lines.push(`\\begin{itemize}[leftmargin=*, nosep]`)
        items.forEach(item => lines.push(`  \\item ${esc(item)}`))
        lines.push(`\\end{itemize}\n`)
      }
    })
  }

  // Projects
  if (projects.some(p => p.name)) {
    lines.push(`\\section{Projects}`)
    projects.filter(p => p.name).forEach(proj => {
      let title = `\\textbf{${esc(proj.name)}}`
      if (proj.techStack) title += ` | \\textit{${esc(proj.techStack)}}`
      if (proj.github) title += ` | \\href{${esc(proj.github)}}{\\faGithub}`
      lines.push(title)
      if (proj.description) {
        const items = proj.description.split('\n').filter(Boolean)
        lines.push(`\\begin{itemize}[leftmargin=*, nosep]`)
        items.forEach(item => lines.push(`  \\item ${esc(item)}`))
        lines.push(`\\end{itemize}\n`)
      }
    })
  }

  // Skills
  if (skills.languages || skills.frameworks || skills.tools) {
    lines.push(`\\section{Technical Skills}`)
    lines.push(`\\begin{itemize}[leftmargin=*, nosep]`)
    if (skills.languages) lines.push(`  \\item \\textbf{Languages:} ${esc(skills.languages)}`)
    if (skills.frameworks) lines.push(`  \\item \\textbf{Frameworks:} ${esc(skills.frameworks)}`)
    if (skills.tools) lines.push(`  \\item \\textbf{Tools:} ${esc(skills.tools)}`)
    lines.push(`\\end{itemize}\n`)
  }

  // List sections
  const listSections = [
    { key: certifications, title: 'Certifications' },
    { key: achievements, title: 'Achievements' },
    { key: positions, title: 'Positions of Responsibility' },
    { key: extracurricular, title: 'Extracurricular Activities' },
  ]

  listSections.forEach(({ key, title }) => {
    const items = key.filter(Boolean)
    if (items.length) {
      lines.push(`\\section{${title}}`)
      lines.push(`\\begin{itemize}[leftmargin=*, nosep]`)
      items.forEach(item => lines.push(`  \\item ${esc(item)}`))
      lines.push(`\\end{itemize}\n`)
    }
  })

  lines.push(`\\end{document}`)
  return lines.join('\n')
}
