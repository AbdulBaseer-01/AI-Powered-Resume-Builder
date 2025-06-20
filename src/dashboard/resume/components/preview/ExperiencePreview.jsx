import React from 'react';

function ExperiencePreview({ resumeInfo }) {
  return (
    <div className="my-4 px-2">
      <h2
        className="section-title mb-4 text-lg font-bold"
        style={{ color: resumeInfo?.themeColor }}
      >
        PROFESSIONAL EXPERIENCE
      </h2>

      {resumeInfo?.experience?.map((experience, index) => (
        <div
          key={index}
          className="experience-item my-4 grid grid-cols-[180px_1fr] gap-4 items-start"
        >
          <div className="flex flex-col items-start text-sm leading-snug">
            <span className="text-black font-medium">
              {experience?.startDate} To {experience?.endDate}
            </span>
            <span
              className="font-semibold"
              style={{ color: resumeInfo?.themeColor }}
            >
              {experience?.title}
            </span>
            <span className="font-medium text-gray-800">
              {experience?.companyName}, {experience?.city}, {experience?.state}
            </span>
          </div>

          <div className="flex flex-col text-sm">
            
            <div
              className="mt-1 text-sm print:prose-none text-black prose prose-sm max-w-none text-justify"
              dangerouslySetInnerHTML={{ __html: experience?.workSummary }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExperiencePreview;
