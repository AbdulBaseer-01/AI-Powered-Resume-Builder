import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { Brain, LoaderCircle, Sparkles, Save } from 'lucide-react'
import { toast } from 'sonner'
import { AIChatSession } from '../../../../../service/AIModel'

const prompt = "Job Title: {jobTitle} , Depends on job title give me list of summary for 3 experience level, Mid Level and Fresher level in 3 -4 lines in array format, With summary and experience_level Field strictly in the JSON Format"

function Summary() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [summary, setSummary] = useState(resumeInfo?.summary || '')
  const [loading, setLoading] = useState(false)
  const [aiGeneratedSummaryList, setAiGenerateSummaryList] = useState()
  const params = useParams()
      useEffect(()=>{
        summary&&setResumeInfo({
            ...resumeInfo,
            summary:summary
        })
    },[summary])
  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle);
    console.log(PROMPT);

    try {
        const result = await AIChatSession.sendMessage(PROMPT);
        const responseText = await result.response.text();
        const json = JSON.parse(responseText);
        console.log(json);
        setAiGenerateSummaryList(json);
    } catch (error) {
        console.error("AI generation failed", error);
        toast("Failed to generate summary from AI");
    } finally {
        setLoading(false);
    }
};


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
        <p className='text-sm text-muted-foreground mb-6'>
          Add a summary for your job title
        </p>

        <form onSubmit={onSave} className='border border-gray-300 rounded-xl p-5 bg-white shadow-sm transition-all'>
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4'>
            <label className='text-sm font-medium text-gray-700'>Add Summary</label>
            <Button
              type='button'
              size='sm'
              variant='outline'
              className='border-primary text-primary flex items-center gap-2'
              onClick={GenerateSummaryFromAI}
              disabled={loading}
            >
              {loading ? <LoaderCircle className='animate-spin w-4 h-4' /> : <Sparkles className='w-4 h-4' />}
              Generate from AI
            </Button>
          </div>

          <Textarea
            className='mt-4'
            required
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder='Write a short professional summary about yourself...'
          />

          <div className='mt-4 flex justify-end'>
            <Button
              disabled={loading}
              type="submit"
              className='bg-primary text-white hover:bg-primary/90 transition'
            >
              {loading
                ? <LoaderCircle className='animate-spin w-4 h-4' />
                : <>
                    <Save className='w-4 h-4 mr-2' />
                    Save
                  </>
              }
            </Button>
          </div>
        </form>

        {aiGeneratedSummaryList && 
          <div className='mt-8' >
            <h3 className='text-lg font-semibold text-gray-800 mb-3'>Suggestions</h3>
            
              {aiGeneratedSummaryList.map((item, index) => (
                <div className='grid gap-4' key={index}>
                  <div
                    key={index}
                    onClick={() => setSummary(item?.summary)}
                    className='cursor-pointer p-4 rounded-xl border hover:shadow-lg transition bg-white'
                  >
                    <h4 className='text-primary font-bold text-sm mb-1'>Level: {item?.experience_level}</h4>
                    <p className='text-sm text-gray-700'>{item?.summary}</p>
                  </div>
                </div>
              ))}
            
          </div>
        }
      </div>
    </div>
  )
}

export default Summary

// import { Button } from '@/components/ui/button'
// import { Textarea } from '@/components/ui/textarea'
// import { ResumeInfoContext } from '@/context/ResumeInfoContext'
// import React, { useContext, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';
// import GlobalApi from './../../../../../service/GlobalApi';
// import { Brain, LoaderCircle } from 'lucide-react';
// import { toast } from 'sonner';
// import { AIChatSession } from './../../../../../service/AIModal';

// const prompt="Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format"
// function Summery({enabledNext}) {
//     const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
//     const [summery,setSummery]=useState();
//     const [loading,setLoading]=useState(false);
//     const params=useParams();
//     const [aiGeneratedSummeryList,setAiGenerateSummeryList]=useState();
//     useEffect(()=>{
//         summery&&setResumeInfo({
//             ...resumeInfo,
//             summery:summery
//         })
//     },[summery])

//     const GenerateSummeryFromAI=async()=>{
//         setLoading(true)
//         const PROMPT=prompt.replace('{jobTitle}',resumeInfo?.jobTitle);
//         console.log(PROMPT);
//         const result=await AIChatSession.sendMessage(PROMPT);
//         console.log(JSON.parse(result.response.text()))
       
//         setAiGenerateSummeryList(JSON.parse(result.response.text()))
//         setLoading(false);
//     }

//     const onSave=(e)=>{
//         e.preventDefault();
       
//         setLoading(true)
//         const data={
//             data:{
//                 summery:summery
//             }
//         }
//         GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(resp=>{
//             console.log(resp);
//             enabledNext(true);
//             setLoading(false);
//             toast("Details updated")
//         },(error)=>{
//             setLoading(false);
//         })
//     }
//     return (
//     <div>
//          <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
//         <h2 className='font-bold text-lg'>Summary</h2>
//         <p>Add Summary for your job title</p>

//         <form className='mt-7' onSubmit={onSave}>
//             <div className='flex justify-between items-end'>
//                 <label>Add Summary</label>
//                 <Button variant="outline" onClick={()=>GenerateSummaryFromAI()} 
//                 type="button" size="sm" className="border-primary text-primary flex gap-2"> 
//                 <Brain className='h-4 w-4' />  Generate from AI</Button>
//             </div>
//             <Textarea className="mt-5" required
//             value={summary}
//                 defaultValue={summary?summary:resumeInfo?.summary}
//             onChange={(e)=>setSummery(e.target.value)}
//             />
//             <div className='mt-2 flex justify-end'>
//             <Button type="submit"
//                 disabled={loading}>
//                     {loading?<LoaderCircle className='animate-spin' />:'Save'}
//                     </Button>
//             </div>
//         </form>
//         </div>

        
//        {aiGeneratedSummeryList&& 
//            <div className='my-5'>
//             <h2 className='font-bold text-lg'>Suggestions</h2>
//             {aiGeneratedSummaryList?.map((item,index)=>(
//                 <div key={index} 
//                 onClick={()=>setSummary(item?.summary)}
//                 className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
//                     <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
//                     <p>{item?.summary}</p>
//                 </div>
//             ))}
//         </div>}

//     </div>
//   )
// }

// export default Summary