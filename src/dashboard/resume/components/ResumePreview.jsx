import React, { useContext, useRef } from 'react'
import { ResumeInfoContext } from '../../../context/ResumeInfoContext'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummaryPreview from './preview/SummaryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationPreview from './preview/EducationPreview'
import SkillPreview from './preview/SkillPreview'
import ProjectsPreview from './preview/ProjectsPreview'

function ResumePreview({ scale = 1 }) {
  const { resumeInfo } = useContext(ResumeInfoContext);
  const resumeRef = useRef(null);

  return (
    <div
      style={{
        width: '210mm',
        height: 'auto',
        position: 'relative',
        background: 'white',
      }}
      
    >
      <div
        ref={resumeRef}
        id="resumePreview"
        className="resume-a4-container"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: `${100 / scale}%`,
        }}
      >
        <div className="bg-[#fdf6ee] p-4">
          <PersonalDetailPreview resumeInfo={resumeInfo} />
        </div>
        <div className="space-y-3 p-4">
          <SummaryPreview resumeInfo={resumeInfo} />
          <ExperiencePreview resumeInfo={resumeInfo} />
          <EducationPreview resumeInfo={resumeInfo} />
          <SkillPreview resumeInfo={resumeInfo} />
          <ProjectsPreview resumeInfo={resumeInfo} />
        </div>
      </div>
    </div>
  );
}


export default ResumePreview



