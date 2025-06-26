import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import GlobalApi from '../../../../../service/GlobalApi';

function EditResume() {
  const {resumeId} = useParams();
  const [resumeInfo, setResumeInfo] = useState();

  useEffect(()=>{
    getResumeInfo();
  },[])

  const getResumeInfo = () =>{
    GlobalApi.GetResumebyId(resumeId).then(resp=>{
      console.log(resp.data.data)
      setResumeInfo(resp.data.data)
    })
  }

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
  <div className="grid grid-cols-1 md:grid-cols-2 p-5 gap-3 mt-20">

    <div className="w-full">
      <FormSection />
    </div>

    <div className=" flex justify-center mt-22 items-start">
      <div className="rounded-lg shadow-md scale-70 origin-top">
        <ResumePreview />
      </div>
    </div>

  </div>
</ResumeInfoContext.Provider>


  )
}

export default EditResume