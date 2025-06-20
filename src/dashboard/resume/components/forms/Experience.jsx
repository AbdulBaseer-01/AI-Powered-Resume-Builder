import { Input} from '@/components/ui/input'
import { Button } from '../../../../components/ui/button'
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'
import { Briefcase, LoaderCircle, Save, PlusCircle, MinusCircle } from 'lucide-react';


const formField={
    title:'',
    companyName:'',
    city:'',
    state:'',
    startDate:'',
    endDate:'',
    workSummary:'',

}
function Experience() {
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    const params=useParams();
    const [loading,setLoading]=useState(false);
    const [experienceList,setExperienceList]=useState([]);

    useEffect(()=>{
        resumeInfo?.experience.length>0&&setExperienceList(resumeInfo?.experience);
    },[])
    const handleChange=(event,index)=>{
        const newEntries=experienceList.slice();
        const {name,value}=event.target;
        newEntries[index][name]=value;
        console.log(newEntries)
        setExperienceList(newEntries);
    }

    const AddNewExperience=()=>{
    
        setExperienceList([...experienceList,{
            title:'',
            companyName:'',
            city:'',
            state:'',
            startDate:'',
            endDate:'',
            workSummary:'',
        }])
    }

    const RemoveExperience=()=>{
        setExperienceList(experienceList=>experienceList.slice(0,-1))
    }

    const handleRichTextEditor=(event,name,index)=>{
        const newEntries=experienceList.slice();
        newEntries[index][name]=event.target.value;
        setExperienceList(newEntries);
    }


    const onSave=()=>{
        setLoading(true)
        const data={
            data:{
                experience:experienceList.map(({ id, ...rest }) => rest)
            }
        }

         console.log(experienceList)

        GlobalApi.UpdateResumedetail(params?.resumeId,data).then(resp=>{
            console.log(resp);
            setLoading(false);
            toast('Details updated !')
        },(error)=>{
            setLoading(false);
            toast('Server Error, Please try again!')
        })

    }

    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            experience:experienceList
        });
     
    },[experienceList]);

  return (
<div className='p-5 mt-10'>
  <div className='p-6 shadow-2xl rounded-2xl border border-primary bg-gradient-to-br from-[#f9f9ff] via-[#ffffff] to-[#eef5ff]'>
    <div className='flex items-center gap-2 mb-4'>
      <Briefcase className='text-purple-500' />
      <h2 className='text-xl font-semibold text-gray-800'>Professional Experience</h2>
    </div>
    <p className='text-sm text-muted-foreground mb-6'>Add your previous job experience</p>

    <div>
      {experienceList.map((item, index) => (
        <div key={index} className='border border-gray-300 p-5 rounded-xl mb-6 hover:shadow-xl transition-shadow'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='text-sm font-medium'>Position Title</label>
              <Input
                name='title'
                defaultValue={item?.title}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div>
              <label className='text-sm font-medium'>Company Name</label>
              <Input
                name='companyName'
                defaultValue={item?.companyName}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div>
              <label className='text-sm font-medium'>City</label>
              <Input
                name='city'
                defaultValue={item?.city}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div>
              <label className='text-sm font-medium'>State</label>
              <Input
                name='state'
                defaultValue={item?.state}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div>
              <label className='text-sm font-medium'>Start Date</label>
              <Input
                type='date'
                name='startDate'
                defaultValue={item?.startDate}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div>
              <label className='text-sm font-medium'>End Date</label>
              <Input
                type='date'
                name='endDate'
                defaultValue={item?.endDate}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div className='md:col-span-2'>
              <label className='text-sm font-medium mb-2 block'>Work Summary</label>
              <RichTextEditor
                index={index}
                name='workSummary'
                defaultValue={item?.workSummary}
                onRichTextEditorChange={(e) =>
                  handleRichTextEditor(e, 'workSummary', index)
                }
              />
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-4'>
      <div className='flex gap-3'>
            <Button variant="outline" onClick={AddNewExperience} className="flex items-center gap-1 text-primary border-primary hover:bg-primary/10">
              <PlusCircle className='w-4 h-4' /> Add Experience
            </Button>
            <Button variant="outline" onClick={RemoveExperience} className="flex items-center gap-1 text-red-600 border-red-500 hover:bg-red-500/10">
              <MinusCircle className='w-4 h-4' /> Remove
            </Button>
          </div>
      <Button
        disabled={loading}
        onClick={onSave}
        className='bg-primary text-white hover:bg-primary/90 transition'
      >
        {loading ? (
          <LoaderCircle className='animate-spin w-4 h-4' />
        ) : (
          <>
            <Save className='w-4 h-4 mr-2' />
            Save
          </>
        )}
      </Button>
    </div>
  </div>
</div>

  )
}

export default Experience