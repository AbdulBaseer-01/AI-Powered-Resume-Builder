import React, { useState } from 'react'
import PersonalDetails from './forms/PersonalDetails'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid, LayoutGridIcon } from 'lucide-react'
import Summary from './forms/Summary';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import Projects from './forms/Projects';
import { Link, Navigate, useParams } from 'react-router-dom';
import ViewResume from '../../../resume2/resumeId/view';
import ThemeSelector from './ThemeSelector';


function FormSection() {
  const [activeFormIndex,setActiveFormIndex]=useState(1);
  const {resumeId}=useParams();
  return (
    <div>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-5'>
            <Link to={"/dashboard"}>
          <Button variant='outline' size='sm'><Home/></Button>
          </Link>
          <ThemeSelector/>
         
          </div>
          <div className='flex gap-2'>
            {activeFormIndex>1
            &&<Button size="sm" 
            onClick={()=>setActiveFormIndex(activeFormIndex-1)}> <ArrowLeft/> </Button> }
            <Button 
            className="flex gap-2" size="sm"
            onClick={()=>setActiveFormIndex(activeFormIndex+1)}
            > Next 
            <ArrowRight/> </Button>
          </div>
        </div>
        {activeFormIndex==1?  
          <PersonalDetails  />
        :activeFormIndex==2?
          <Summary   />
        :activeFormIndex==3?
          <Experience  />
        :activeFormIndex==4?
          <Education  />
        :activeFormIndex==5?
          <Skills />
        :activeFormIndex==6?
          <Projects />
        :activeFormIndex==7?
          <Navigate to={'/resume2/'+resumeId+"/view"}/>
        :null
          }


    </div>
  )
}

export default FormSection