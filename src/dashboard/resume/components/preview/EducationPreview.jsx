import React from 'react'

function EducationPreview({resumeInfo}) {
  return (
    <div className="my-4 px-2">
  <h2
    className="section-title mb-4 text-4xl font-bold"
    style={{ color: resumeInfo?.themeColor }}
  >
    EDUCATION
  </h2>

  {resumeInfo?.education?.map((education, index) => (
    <div
      key={index}
      className="education-item my-4 grid grid-cols-3 gap-4 items-start"
    >
      <div className="flex flex-col items-start text-sm">
        <span className="item-title text-gray-700">
          {education?.startDate} To {education?.endDate}
        </span>
        <span
          className="font-semibold"
          style={{ color: resumeInfo?.themeColor }}
        >
          {education?.universityName}
        </span>
      </div>

      <div className="col-span-2 flex flex-col text-sm">
        <span className="text-gray-800 font-medium">
          {education?.degree} in {education?.major}
        </span>
        <p className="text-sm mt-1 text-black text-justify">{education?.description}</p>
      </div>
    </div>
  ))}
</div>


  );
}

export default EducationPreview;