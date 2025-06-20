import React, { useContext, useEffect, useState } from 'react'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'
import {Input} from '@/components/ui/input'
import { Button } from '../../../../components/ui/button';
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../../service/GlobalApi';
import { LoaderCircle, UserCircle, Save } from 'lucide-react';
import { toast } from 'sonner';

function PersonalDetails() {

    const params = useParams();
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
    const [formData, setFormData] = useState();
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        console.log(params)
    },[])
    const handleInputChange = (e)=>{
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
        setResumeInfo({
            ...resumeInfo,
            [name]:value
        })
    }
    const onSave = (e)=>{
        e.preventDefault();
        setLoading(true);
        const data ={
            data:formData
        }
        GlobalApi.UpdateResumedetail(params?.resumeId,data).then(resp=>{
            console.log(resp);
            setLoading(false);
            toast("Details updated");
        },(error)=>{
            setLoading(false);
        })
    }
  return (
    <div className='p-5 mt-10'>
      <div className='p-6 shadow-2xl rounded-2xl border border-primary bg-gradient-to-br from-[#f9f9ff] via-[#ffffff] to-[#eef5ff]'>
        <div className='flex items-center gap-2 mb-4'>
          <UserCircle className='text-purple-700' />
          <h2 className='text-xl font-semibold text-gray-800'>Personal Details</h2>
        </div>
        <p className='text-sm text-muted-foreground mb-6'>Get started with the basic information</p>

        <form onSubmit={onSave}  className='rounded-xl border border-gray-300 p-5 hover:shadow-xl transition-shadow'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='text-sm font-medium'>First Name</label>
              <Input name='firstName' defaultValue={resumeInfo?.firstName} required onChange={handleInputChange} />
            </div>
            <div>
              <label className='text-sm font-medium'>Last Name</label>
              <Input name='lastName' defaultValue={resumeInfo?.lastName} required onChange={handleInputChange} />
            </div>
            <div className='md:col-span-2'>
              <label className='text-sm font-medium'>Job Title</label>
              <Input name='jobTitle' defaultValue={resumeInfo?.jobTitle} required onChange={handleInputChange} />
            </div>
            
            <div>
              <label className='text-sm font-medium'>Phone</label>
              <Input name='phone' defaultValue={resumeInfo?.phone} required onChange={handleInputChange} />
            </div>
            <div>
              <label className='text-sm font-medium'>Email</label>
              <Input name='email' defaultValue={resumeInfo?.email} required onChange={handleInputChange} />
            </div>
          </div>

          <div className='mt-6 flex justify-end'>
            <Button type='submit' disabled={loading} className='bg-primary text-white hover:bg-primary/90 transition'>
              {loading ? <LoaderCircle className='animate-spin w-4 h-4' /> : <><Save className='w-4 h-4 mr-2' /> Save</>}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PersonalDetails