import React from 'react';

function ProjectsPreview({ resumeInfo }) {
  const projects = resumeInfo?.projects?.filter(p => p.type !== 'achievement') || [];

  return (
    <div className="my-2 px-2 text-sm leading-snug print:text-[10pt]">
      {projects.length > 0 && (
        <>
          <h2
            className="section-title font-bold mb-2 tracking-wide"
            style={{ color: resumeInfo?.themeColor }}
          >
            PROJECTS
          </h2>

          <div className="space-y-1">
            {projects.map((project, index) => (
              <div key={index}>
                <div className="flex flex-wrap justify-between items-baseline">
                  <div className="flex flex-wrap gap-1 items-baseline">
                    <span
                      className="font-semibold"
                      style={{ color: resumeInfo?.themeColor }}
                    >
                      {project?.projectName}
                    </span>
                    {project?.technologiesUsed && (
                      <span className="italic text-gray-500 text-xs">
                        ({project?.technologiesUsed})
                      </span>
                    )}
                  </div>
                  {project?.projectLink && (
                    <a
                      href={project?.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 underline ml-2"
                    >
                      VIEW PROJECT
                    </a>
                  )}
                </div>

                {project?.description && (
                  <p className="text-sm text-black text-justify mt-[2px]">
                    {project?.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ProjectsPreview;
// function ProjectsPreview({ resumeInfo }) {
//   const projects = resumeInfo?.projects?.filter(p => p.type !== 'achievement') || [];
//   const achievements = resumeInfo?.projects?.filter(p => p.type === 'achievement') || [];

//   return (

//     <div className="my-2 px-2 text-sm leading-snug print:text-[10pt]">
//   {projects.length > 0 && (
//     <>
//       <h2 className="section-title font-bold mb-2 tracking-wide"
//           style={{ color: resumeInfo?.themeColor }}>
//         PROJECTS
//       </h2>

//       <div className="space-y-1">
//         {projects.map((project, index) => (
//           <div key={index}>
//             <div className="flex flex-wrap justify-between items-baseline">
//               <div className="flex flex-wrap gap-1 items-baseline">
//                 <span className="font-semibold" style={{ color: resumeInfo?.themeColor }}>
//                   {project?.projectName}
//                 </span>
//                 {project?.technologiesUsed && (
//                   <span className="italic text-gray-500 text-xs">
//                     ({project?.technologiesUsed})
//                   </span>
//                 )}
//               </div>
//               {project?.projectLink && (
//                 <a
//                   href={project?.projectLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-xs text-blue-600 underline ml-2"
//                 >
//                   VIEW PROJECT
//                 </a>
//               )}
//             </div>

//             {project?.description && (
//               <p className="text-sm text-black text-justify mt-[2px]">
//                 {project?.description}
//               </p>
//             )}
//           </div>
//         ))}
//       </div>
//     </>
//   )}

//   {achievements.length > 0 && (
//     <>
//       <h2 className="section-title  font-bold mt-4 mb-2 tracking-wide"
//           style={{ color: resumeInfo?.themeColor }}>
//         ACHIEVEMENTS
//       </h2>

//       <div className="space-y-1">
//   {achievements.map((item, index) => (
//     <div key={index}>
//       <div className="flex flex-wrap justify-between items-baseline">
//         <div className="flex flex-wrap gap-1 items-baseline">
//           <span className="font-semibold" style={{ color: resumeInfo?.themeColor }}>
//             {item?.projectName}
//           </span>
//           {item?.technologiesUsed && (
//             <span className="italic text-gray-500 text-xs">
//               ({item?.technologiesUsed})
//             </span>
//           )}
//         </div>
//         {item?.projectLink && (
//           <a
//             href={item?.projectLink}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-xs text-blue-600 underline ml-2"
//           >
//             VIEW LINK
//           </a>
//         )}
//       </div>

//       {item?.description && (
//         <p className="text-sm text-black text-justify mt-[2px]">
//           {item?.description}
//         </p>
//       )}
//     </div>
//   ))}
// </div>

//     </>
//   )}
// </div>


//   );
// }

// export default ProjectsPreview;
