import { Loader2, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/clerk-react'
import GlobalApi from '../../../service/GlobalApi'
import { useNavigate } from 'react-router-dom'
import ResumeCard from '../../components/custom/ResumeCard'

function AddResume({resumeInfo}) {
  const [isDialogOpen, setDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState();
  const { user } = useUser();
  const [loading, setLoading] = useState(false)
  const navigation = useNavigate();

  const onCreate = () => {
    setLoading(true)
    const uuid = uuidv4();
    const data = {
      data: {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        templateN: resumeInfo?.templateN,
      }
    }
    GlobalApi.CreateNewResume(data).then(resp=>{
      console.log(resp.data.data.documentId);
      if(resp){
        setLoading(false)
        navigation('/dashboard/resume/'+resp.data.data.documentId+"/edit")
      }
    },(error)=>{
      setLoading(false)
    })
  }

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setDialog}>
        <DialogTrigger asChild>
          <ResumeCard/>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <b>Add a title for your new resume</b>
              <Input
                className='my-2'
                placeholder='Ex. Full Stack resume'
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
          </DialogHeader>
          <div className='flex justify-end gap-5'>
            <Button variant='ghost' onClick={() => setDialog(false)}>Cancel</Button>
            <Button disabled={!resumeTitle||loading} 
            onClick={onCreate}
            >{
                loading?
                <Loader2 className='animate-spin'/>: 'Create'
              }</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddResume;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { v4 as uuidv4 } from 'uuid';
// import { useUser } from '@clerk/clerk-react'
// import GlobalApi from '../../../service/GlobalApi'

// function AddResume() {
// const [isDialogOpen, setDialog] = useState(false);
//   const [resumeTitle, setResumeTitle] = useState();
//   const { user } = useUser();
//   const [loading, setLoading] = useState(false)
//   const navigation = useNavigate();

//   const onCreate = () => {
//     setLoading(true)
//     const uuid = uuidv4();
//     const data = {
//       data: {
//         title: resumeTitle,
//         resumeId: uuid,
//         userEmail: user?.primaryEmailAddress?.emailAddress,
//         userName: user?.fullName
//       }
//     }
//     GlobalApi.CreateNewResume(data).then(resp=>{
//       console.log(resp.data.data.documentId);
//       if(resp){
//         setLoading(false)
//         navigation('/dashboard/resume/'+resp.data.data.documentId+"/edit")
//       }
//     },(error)=>{
//       setLoading(false)
//     })
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogTrigger asChild>
//           <Button onClick={() => setOpen(true)}>Create Resume</Button>
//         </DialogTrigger>
//         <DialogContent>
//           <h2 className="text-lg font-semibold mb-2">Enter Resume Name</h2>
//           <input
//             className="w-full border rounded p-2"
//             value={resumeTitle}
//             onChange={(e) => setResumeName(e.target.value)}
//             placeholder="e.g., Frontend Developer Resume"
//           />
//           <div className="flex justify-end gap-2 mt-4">
//             <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
//             <Button onClick={onCreate}>Create</Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// export default AddResume;

