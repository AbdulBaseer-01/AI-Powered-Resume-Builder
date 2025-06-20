import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { Brain, LoaderCircle, Sparkles, Save } from 'lucide-react';
import { toast } from 'sonner';
import { AIChatSession } from '../../../../../service/AIModel';

const prompt="Job Title: {jobTitle} , Depends on job title give me list of  summary for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summary and experience_level Field strictly in the JSON Format"
function Summary({enabledNext}) {
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    const [summary,setSummary]=useState();
    const [loading,setLoading]=useState(false);
    const params=useParams();
    const [aiGeneratedSummaryList,setAiGenerateSummaryList]=useState();
    useEffect(()=>{
        summary&&setResumeInfo({
            ...resumeInfo,
            summary:summary
        })
    },[summary])

    const GenerateSummaryFromAI=async()=>{
        setLoading(true)
        const PROMPT=prompt.replace('{jobTitle}',resumeInfo?.jobTitle);
        console.log(PROMPT);
        const result=await AIChatSession.sendMessage(PROMPT);
        console.log(JSON.parse(result.response.text()))
       
        setAiGenerateSummaryList(JSON.parse(result.response.text()))
        setLoading(false);
    }

    const onSave=(e)=>{
        e.preventDefault();
       
        setLoading(true)
        const data={
            data:{
                summary:summary
            }
        }
        GlobalApi.UpdateResumedetail(params?.resumeId,data).then(resp=>{
            console.log(resp);
            enabledNext(true);
            setLoading(false);
            toast("Details updated")
        },(error)=>{
            setLoading(false);
        })
    }
    return (
    <div className='py-5 mt-10'>
      <div className='py-6 border-primary'>
        <h2 className='text-xl font-semibold text-gray-800 flex items-center gap-2'>
          <Sparkles className='text-purple-700' />
          Summary
        </h2>
        <p className='text-sm text-muted-foreground mb-6'>Add a summary for your job title</p>

        <form onSubmit={onSave} className='border border-gray-300 rounded-xl p-5 bg-white shadow-sm transition-all'>
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4'>
            <label className='text-sm font-medium text-gray-700'>Add Summary</label>
            <Button
              type='button'
              size='sm'
              variant='outline'
              className='border-primary text-primary flex items-center gap-2'
              onClick={GenerateSummaryFromAI}
            >
              <Sparkles className='w-4 h-4' />
              Generate from AI
            </Button>
          </div>

          <Textarea
            className='mt-4'
            required
            value={summary}
            defaultValue={resumeInfo?.summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder='Write a short professional summary about yourself...'
          />

          <div className='mt-4 flex justify-end'>            
            <Button disabled={loading} onClick={onSave} className='bg-primary text-white hover:bg-primary/90 transition'>
                    {loading ? <LoaderCircle className='animate-spin w-4 h-4' /> : <><Save className='w-4 h-4 mr-2' /> Save</>}
            </Button>
          </div>
        </form>

        {aiGeneratedSummaryList && (
          <div className='mt-8'>
            <h3 className='text-lg font-semibold text-gray-800 mb-3'>Suggestions</h3>
            <div className='grid gap-4'>
              {aiGeneratedSummaryList.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSummary(item?.summary)}
                  className='cursor-pointer p-4 rounded-xl border hover:shadow-lg transition bg-white'
                >
                  <h4 className='text-primary font-bold text-sm mb-1'>Level: {item?.experience_level}</h4>
                  <p className='text-sm text-gray-700'>{item?.summary}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Summary