// import { Input } from '@/components/ui/input';
// import { Button } from '../../../../components/ui/button';
// import { Textarea } from '@/components/ui/textarea';
// import React, { useContext, useEffect, useState } from 'react';
// import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
// import { useParams } from 'react-router-dom';
// import GlobalApi from './../../../../../service/GlobalApi';
// import { toast } from 'sonner';
// import { LoaderCircle, Laptop2, Trophy, PlusCircle, MinusCircle, Save } from 'lucide-react';

// function Projects() {
//   const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
//   const params = useParams();
//   const [loading, setLoading] = useState(false);
//   const [projectsList, setProjectsList] = useState([]);

//   useEffect(() => {
//     resumeInfo?.projects.length > 0 && setProjectsList(resumeInfo?.projects);
//   }, []);

//   const handleChange = (event, index) => {
//     const newEntries = [...projectsList];
//     const { name, value } = event.target;
//     newEntries[index][name] = value;
//     setProjectsList(newEntries);
//   };

//   const handleTypeToggle = (index, type) => {
//     const updated = [...projectsList];
//     updated[index].type = type;
//     setProjectsList(updated);
//   };

//   const AddNewProject = () => {
//     setProjectsList([
//       ...projectsList,
//       {
//         type: '', // default type
//         projectName: '',
//         technologiesUsed: '',
//         description: '',
//         projectLink: '',
//       },
//     ]);
//   };

//   const RemoveProject = () => {
//     setProjectsList((projectsList) => projectsList.slice(0, -1));
//   };

//   const onSave = () => {
//     setLoading(true);
//     const data = {
//       data: {
//         projects: projectsList.map(({ id, ...rest }) => rest),
//       },
//     };

//     GlobalApi.UpdateResumedetail(params?.resumeId, data).then(
//       (resp) => {
//         console.log(resp);
//         setLoading(false);
//         toast('Details updated !');
//       },
//       (error) => {
//         setLoading(false);
//         toast('Server Error, Please try again!');
//       }
//     );
//   };

//   useEffect(() => {
//     setResumeInfo({
//       ...resumeInfo,
//       projects: projectsList,
//     });
//   }, [projectsList]);

//   return (
//     <div className='p-5 mt-10'>
//       <div className='p-6 shadow-2xl rounded-2xl border border-primary bg-gradient-to-br from-[#f9f9ff] via-[#ffffff] to-[#eef5ff]'>
//         <h2 className='text-xl font-semibold text-gray-800 flex items-center gap-2'>
//           <Laptop2 className='text-purple-700' />
//           Projects / Achievements
//         </h2>
//         <p className='text-sm text-muted-foreground mb-6'>
//           Add your completed or ongoing project or achievement details.
//         </p>

//         <div className='space-y-6'>
//           {projectsList.map((project, index) => (
//             <div key={index}>
//               <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 border p-4 rounded-xl bg-white shadow-sm'>
//                 <div className='col-span-2 flex gap-3'>
//                   <button
//                     onClick={() => handleTypeToggle(index, 'project')}
//                     className={`flex items-center gap-2 px-4 py-1 rounded-lg text-sm transition ${
//                       project.type === 'project'
//                         ? 'bg-primary text-white'
//                         : 'bg-white text-black border'
//                     }`}
//                   >
//                     <Laptop2 size={16} />
//                     Project
//                   </button>
//                   <button
//                     onClick={() => handleTypeToggle(index, 'achievement')}
//                     className={`flex items-center gap-2 px-4 py-1 rounded-lg text-sm transition ${
//                       project.type === 'achievement'
//                         ? 'bg-primary text-white'
//                         : 'bg-white text-black border'
//                     }`}
//                   >
//                     <Trophy size={16} />
//                     Achievement
//                   </button>
//                 </div>

//                 <div>
//                   <label className='text-xs font-medium text-gray-700'>
//                     {project.type === 'achievement' ? 'Achievement Name' : 'Project Name'}
//                   </label>
//                   <Input
//                     name='projectName'
//                     defaultValue={project?.projectName}
//                     onChange={(e) => handleChange(e, index)}
//                   />
//                 </div>
//                 <div>
//                   <label className='text-xs font-medium text-gray-700'>
//                     {project.type === 'achievement' ? 'Organization' : 'Tech Stack'}
//                   </label>
//                   <Input
//                     name='technologiesUsed'
//                     defaultValue={project?.technologiesUsed}
//                     onChange={(e) => handleChange(e, index)}
//                   />
//                 </div>

//                 <div className='col-span-2'>
//                   <label className='text-xs font-medium text-gray-700 mb-1 block'>Description</label>
//                   <Textarea
//                     name='description'
//                     defaultValue={project?.description}
//                     onChange={(e) => handleChange(e, index)}
//                   />
//                 </div>

//                 <div className='col-span-2'>
//                   <label className='text-xs font-medium text-gray-700'>
//                     {project.type === 'achievement' ? 'Certificate / Reference Link' : 'Project Link'}
//                   </label>
//                   <Input
//                     name='projectLink'
//                     defaultValue={project?.projectLink}
//                     onChange={(e) => handleChange(e, index)}
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className='flex flex-col sm:flex-row justify-between items-center gap-4 mt-8'>
//                   <div className='flex gap-3'>
//                     <Button variant="outline" onClick={AddNewProject} className="flex items-center gap-1 text-primary border-primary hover:bg-primary/10">
//                       <PlusCircle className='w-4 h-4' /> Add Project/Achievement
//                     </Button>
//                     <Button variant="outline" onClick={RemoveProject} className="flex items-center gap-1 text-red-600 border-red-500 hover:bg-red-500/10">
//                       <MinusCircle className='w-4 h-4' /> Remove
//                     </Button>
//                   </div>
//                   <Button disabled={loading} onClick={onSave} className='bg-primary text-white hover:bg-primary/90 transition'>
//                     {loading ? <LoaderCircle className='animate-spin w-4 h-4' /> : <><Save className='w-4 h-4 mr-2' /> Save</>}
//                   </Button>
//                 </div>
//       </div>
//     </div>
//   );
// }

// export default Projects;


import { Input } from '@/components/ui/input';
import { Button } from '../../../../components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import React, { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';
import { LoaderCircle, Laptop2, PlusCircle, MinusCircle, Save } from 'lucide-react';

function Projects() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [projectsList, setProjectsList] = useState([]);

  useEffect(() => {
    resumeInfo?.projects.length > 0 && setProjectsList(resumeInfo?.projects);
  }, []);

  const handleChange = (event, index) => {
    const newEntries = [...projectsList];
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setProjectsList(newEntries);
  };

  const AddNewProject = () => {
    setProjectsList([
      ...projectsList,
      {
        projectName: '',
        technologiesUsed: '',
        description: '',
        projectLink: '',
      },
    ]);
  };

  const RemoveProject = () => {
    setProjectsList((projectsList) => projectsList.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        projects: projectsList.map(({ id, ...rest }) => rest),
      },
    };

    GlobalApi.UpdateResumedetail(params?.resumeId, data).then(
      (resp) => {
        console.log(resp);
        setLoading(false);
        toast('Details updated !');
      },
      (error) => {
        setLoading(false);
        toast('Server Error, Please try again!');
      }
    );
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      projects: projectsList,
    });
  }, [projectsList]);

  return (
    <div className='p-5 mt-10'>
      <div className='p-6 shadow-2xl rounded-2xl border border-primary bg-gradient-to-br from-[#f9f9ff] via-[#ffffff] to-[#eef5ff]'>
        <h2 className='text-xl font-semibold text-gray-800 flex items-center gap-2'>
          <Laptop2 className='text-purple-700' />
          Projects
        </h2>
        <p className='text-sm text-muted-foreground mb-6'>
          Add your completed or ongoing project details.
        </p>

        <div className='space-y-6'>
          {projectsList.map((project, index) => (
            <div key={index}>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 border p-4 rounded-xl bg-white shadow-sm'>
                <div>
                  <label className='text-xs font-medium text-gray-700'>
                    Project Name
                  </label>
                  <Input
                    name='projectName'
                    defaultValue={project?.projectName}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div>
                  <label className='text-xs font-medium text-gray-700'>
                    Tech Stack
                  </label>
                  <Input
                    name='technologiesUsed'
                    defaultValue={project?.technologiesUsed}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>

                <div className='col-span-2'>
                  <label className='text-xs font-medium text-gray-700 mb-1 block'>Description</label>
                  <Textarea
                    name='description'
                    defaultValue={project?.description}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>

                <div className='col-span-2'>
                  <label className='text-xs font-medium text-gray-700'>
                    Project Link
                  </label>
                  <Input
                    name='projectLink'
                    defaultValue={project?.projectLink}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='flex flex-col sm:flex-row justify-between items-center gap-4 mt-8'>
          <div className='flex gap-3'>
            <Button variant="outline" onClick={AddNewProject} className="flex items-center gap-1 text-primary border-primary hover:bg-primary/10">
              <PlusCircle className='w-4 h-4' /> Add Project
            </Button>
            <Button variant="outline" onClick={RemoveProject} className="flex items-center gap-1 text-red-600 border-red-500 hover:bg-red-500/10">
              <MinusCircle className='w-4 h-4' /> Remove
            </Button>
          </div>
          <Button disabled={loading} onClick={onSave} className='bg-primary text-white hover:bg-primary/90 transition'>
            {loading ? <LoaderCircle className='animate-spin w-4 h-4' /> : <><Save className='w-4 h-4 mr-2' /> Save</>}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Projects;