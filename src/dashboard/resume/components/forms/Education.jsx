import React, { useState, useContext, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '../../../../components/ui/textarea'
import { Button } from '../../../../components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'
import GlobalApi from './../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { GraduationCap, PlusCircle, MinusCircle, Save } from 'lucide-react'

function Education() {
  const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
  const params=useParams();
    const [loading, setLoading] = useState(false);
  const [educationList, addEducationList] = useState([
    {
      universityName:'',
      degree:'',
      major:'',
      startDate:'',
      endDate:'',
      description:''
    }
  ]);

  useEffect(()=>{
    resumeInfo&&addEducationList(resumeInfo?.education)
  },[])

  const handleChange=(event,index)=>{
        const newEntries=educationList.slice();
        const {name,value}=event.target;
        newEntries[index][name]=value;
        console.log(newEntries)
        addEducationList(newEntries);
    }


  const AddNewEducation = ()=>{
    addEducationList([...educationList,{
        universityName:'',
        degree:'',
        major:'',
        startDate:'',
        endDate:'',
        description:'',
    }])
  }

  const RemoveEducation = ()=>{
    addEducationList(educationList=>educationList.slice(0,-1))
  }

  const onSave=()=>{
    setLoading(true)
    const data={
      data:{
        education:educationList.map(({ id, ...rest }) => rest)
      }
    }

    GlobalApi.UpdateResumedetail(params.resumeId,data).then(resp=>{
      console.log(resp);
      setLoading(false)
      toast('Details updated !')
    },(error)=>{
      setLoading(false);
      toast('Server Error, Please try again!')
    })

  }

  useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            education:educationList
        });
     
    },[educationList]);

  return (

    


    <div className='p-5 mt-10'>
      <div className='p-6 shadow-2xl rounded-2xl border border-primary bg-gradient-to-br from-[#f9f9ff] via-[#ffffff] to-[#eef5ff]'>
        <div className='flex items-center gap-2 mb-4'>
          <GraduationCap className='text-purple-700' />
          <h2 className='text-xl font-semibold text-gray-800'>Education</h2>
        </div>
        <p className='text-sm text-muted-foreground mb-6'>Add your education details to show your academic background</p>

        <div className='space-y-6'>
          {educationList.map((item, index) => (
            <div key={index} className='rounded-xl border border-gray-300 p-5 hover:shadow-xl transition-shadow'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='md:col-span-2'>
                  <label className='font-medium'>University Name</label>
                  <Input name='universityName' defaultValue={item?.universityName} onChange={(e) => handleChange(e, index)} />
                </div>
                <div>
                  <label className='font-medium'>Degree</label>
                  <Input name='degree' defaultValue={item?.degree} onChange={(e) => handleChange(e, index)} />
                </div>
                <div>
                  <label className='font-medium'>Major</label>
                  <Input name='major' defaultValue={item?.major} onChange={(e) => handleChange(e, index)} />
                </div>
                <div>
                  <label className='font-medium'>Start Date</label>
                  <Input type='date' defaultValue={item?.startDate} name='startDate' onChange={(e) => handleChange(e, index)} />
                </div>
                <div>
                  <label className='font-medium'>End Date</label>
                  <Input type='date' defaultValue={item?.endDate} name='endDate' onChange={(e) => handleChange(e, index)} />
                </div>
                <div className='md:col-span-2'>
                  <label className='font-medium'>Description</label>
                  <Textarea name='description' defaultValue={item?.description} onChange={(e) => handleChange(e, index)} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='flex flex-col sm:flex-row justify-between items-center gap-4 mt-8'>
          <div className='flex gap-3'>
            <Button variant="outline" onClick={AddNewEducation} className="flex items-center gap-1 text-primary border-primary hover:bg-primary/10">
              <PlusCircle className='w-4 h-4' /> Add Education
            </Button>
            <Button variant="outline" onClick={RemoveEducation} className="flex items-center gap-1 text-red-600 border-red-500 hover:bg-red-500/10">
              <MinusCircle className='w-4 h-4' /> Remove
            </Button>
          </div>
          <Button disabled={loading} onClick={onSave} className='bg-primary text-white hover:bg-primary/90 transition'>
            {loading ? <LoaderCircle className='animate-spin w-4 h-4' /> : <><Save className='w-4 h-4 mr-2' /> Save</>}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Education