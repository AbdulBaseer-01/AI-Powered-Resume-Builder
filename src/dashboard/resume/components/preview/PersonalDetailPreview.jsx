import React from 'react'

function PersonalDetailPreview({resumeInfo}) {
  return (
    <div className="px-4">
      <h1
        className="font-bold text-center"
        style={{
          color: resumeInfo?.themeColor,
          fontSize: '22pt',
          margin: '0 0 2mm 0',
        }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h1>

      <h2 className="text-center font-medium"
        style={{
          fontSize: '14pt',
          margin: '0 0 3mm 0',
        }}
      >
        {resumeInfo?.jobTitle}
      </h2>

      

      <div className="flex justify-between font-normal"
        style={{
          color: resumeInfo?.themeColor,
          fontSize: '10pt',
        }}
      >
        <h2>{resumeInfo?.phone}</h2>
        <h2>{resumeInfo?.email}</h2>
      </div>
    </div>
  )
}

export default PersonalDetailPreview