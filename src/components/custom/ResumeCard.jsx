import React from 'react'
import { FilePlus2 } from 'lucide-react'

function ResumeCard({
  title = 'Start Building Your Resume',
  description = 'Click here to create a stunning, professional resume in minutes using our AI-powered builder.',
  cta = 'Create Resume',
  onClick = () => alert('Redirecting to resume builder...')
}) {
  return (
    <div
      onClick={onClick}
      className="max-w-sm mx-auto cursor-pointer rounded-2xl border border-primary bg-gradient-to-br from-[#f9f9ff] via-white to-[#eef5ff] p-6 shadow-2xl hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 group"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition">
          <FilePlus2 className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        {description}
      </p>
      <div className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:underline">
        {cta}
        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  )
}

export default ResumeCard

