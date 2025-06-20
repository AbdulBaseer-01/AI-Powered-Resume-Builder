import React from 'react';

function getRatingLabel(rating) {
  if (rating >= 5) return "Expert";
  if (rating >= 4) return "Advanced";
  if (rating >= 2) return "Intermediate";
  if (rating >= 1) return "Beginner";
  return "No Experience";
}

function SkillPreview({ resumeInfo }) {
  return (
    <div className="my-4 px-2">
      <h2 className="section-title" style={{ color: resumeInfo?.themeColor }}>
        SKILLS
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        {resumeInfo?.skills?.map((skill, index) => (
          <div key={index} className="flex flex-col gap-1">
            <div className="flex justify-between item-title font-medium">
              <span className="truncate">{skill.name}</span>
              <span className="text-gray-700">{getRatingLabel(skill.rating)}</span>
            </div>
            <div
              className="h-2 bg-gray-200 rounded-sm overflow-hidden"
              style={{ border: `1px solid ${resumeInfo?.themeColor}` }}
            >
              <div
                className="h-full"
                style={{
                  backgroundColor: resumeInfo?.themeColor,
                  width: `${skill.rating * 20}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillPreview;
