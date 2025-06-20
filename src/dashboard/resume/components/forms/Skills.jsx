import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import {BsCircleFill} from 'react-icons/bs';
import {BsCircle} from 'react-icons/bs'
import '@smastrom/react-rating/style.css'
import { Button } from '../../../../components/ui/button'
import { Brain, LoaderCircle, Save, PlusCircle, MinusCircle } from 'lucide-react'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'
import GlobalApi from './../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

const myStyles = {
  itemShapes: <BsCircle />,
  boxBorderWidth: 4,

  activeFillColor: ['#e3f0fb', '#c2dcf4', '#91bdf0', '#5da1eb', '#0a66c2'],
  activeBoxColor: ['#d8ebfb', '#adcff4', '#7db1eb', '#468fe0', '#0a66c2'],
  activeBoxBorderColor: ['#b6d6f4', '#85b5eb', '#5494e0', '#2978cc', '#094f90'],

  inactiveFillColor: '#f4f7fa',
  inactiveBoxColor: '#dde7f0',
  inactiveBoxBorderColor: '#a3b8c8'
};

function Skills() {

    const [skillsList,setSkillsList]=useState([{
            name:'',
            rating:0 
        }])
    const {resumeId} = useParams();

    const [loading,setLoading]=useState(false);
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
   
    useEffect(()=>{
        resumeInfo&&setSkillsList(resumeInfo?.skills)
    },[])

    const handleChange=(index,name,value)=>{
        const newEntries=skillsList.slice();
        newEntries[index][name]=value;
        setSkillsList(newEntries);
    }

    const AddNewSkills=()=>{
        setSkillsList([...skillsList,{
            name:'',
            rating:0 
        }])
    }
    const RemoveSkills=()=>{
        setSkillsList(skillsList=>skillsList.slice(0,-1))
    }

    const onSave=()=>{

        setLoading(true);
        const data={
            data:{
                skills:skillsList.map(({ id, ...rest }) => rest)
            }
        }
        console.log(skillsList)

        GlobalApi.UpdateResumedetail(resumeId,data).then(resp=>{
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
            skills:skillsList
        })
    },[skillsList])
  return (
    <div className='p-5 mt-10'>
  <div className='p-6 shadow-2xl rounded-2xl border border-primary bg-gradient-to-br from-[#f9f9ff] via-[#ffffff] to-[#eef5ff]'>
    <div className='flex items-center gap-2 mb-4'>
      <Brain className='text-purple-500' />
      <h2 className='text-xl font-semibold text-gray-800'>Skills</h2>
    </div>
    <p className='text-sm text-muted-foreground mb-6'>Add your top professional skills</p>

    <div className='space-y-4 mb-6'>
      {skillsList.map((item, index) => (
        <div
          key={index}
          className='flex flex-col md:flex-row justify-between md:items-center gap-4 border border-gray-300 rounded-xl p-4 hover:shadow-xl transition-shadow'
        >
          <div className='w-full md:w-2/3'>
            <label className='text-sm font-medium mb-1 block'>Skill Name</label>
            <Input
              className='w-full'
              defaultValue={item.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
            />
          </div>
          <div className='w-full md:w-1/3 flex items-center gap-3'>
            <label className='text-sm text-muted-foreground hidden md:block whitespace-nowrap'>Rating</label>
            <Rating
              style={{ maxWidth: 120, maxHeight: 20 }}
              value={item.rating}
              itemStyles={myStyles}
              onChange={(v) => handleChange(index, 'rating', v)}
            />
          </div>
        </div>
      ))}
    </div>

    <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
      <div className='flex gap-2'>
        <div className='flex gap-3'>
            <Button variant="outline" onClick={AddNewSkills} className="flex items-center gap-1 text-primary border-primary hover:bg-primary/10">
              <PlusCircle className='w-4 h-4' /> Add Skill
            </Button>
            <Button variant="outline" onClick={RemoveSkills} className="flex items-center gap-1 text-red-600 border-red-500 hover:bg-red-500/10">
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
  </div>

  )
}

export default Skills