import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function LatexCodeView({ code }) {
  return (
    <div className="latex-view-container" id="latex-code-view">
      <SyntaxHighlighter
        language="latex"
        style={vscDarkPlus}
        showLineNumbers
        customStyle={{
          margin: 0,
          padding: '20px',
          fontSize: '0.85rem',
          lineHeight: '1.6',
          background: '#1e1e1e',
          minHeight: '100%',
        }}
        wrapLongLines
      >
        {code || '% Enter your resume details in the form to generate LaTeX code...'}
      </SyntaxHighlighter>
    </div>
  )
}
