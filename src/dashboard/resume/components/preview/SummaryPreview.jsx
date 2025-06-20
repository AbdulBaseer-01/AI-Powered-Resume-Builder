import React from 'react';

function SummaryPreview({ resumeInfo }) {
  return (
    <div className='my-2 px-2'>
      <p className="item-title">
        {resumeInfo?.summary}
      </p>
    </div>
  );
}

export default SummaryPreview;
