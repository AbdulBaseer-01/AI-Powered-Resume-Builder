import React, { useState, useEffect, useRef } from 'react';
import Header from '../../../components/custom/Header';
import GlobalApi from '../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { ResumeInfoContext } from '../../../context/ResumeInfoContext';
import { Button } from '../../../components/ui/button';
import ResumePreview from '../../../dashboard/resume/components/ResumePreview';

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const printAreaRef = useRef(null);
  const { resumeId } = useParams();

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = () => {
    GlobalApi.GetResumebyId(resumeId).then((resp) => {
      setResumeInfo(resp.data.data);
    });
  };

  const HandleDownload = () => {
    window.print();
  };

  return (
    <div className=" mt-20 ">
      <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
        <div id="no-print">
          <Header />
          <div className="">
            <h2 className="text-center text-2xl font-medium">
              Congrats! Your Ultimate AI generated Resume is ready!
            </h2>
            <p className="text-center text-gray-400">
              Now you are ready to download your resume and share your unique resume URL with friends and family.
            </p>
            <div className="flex justify-center px-44 py-5">
              <Button onClick={HandleDownload}>Download</Button>
            </div>
          </div>
        </div>

        <div >
          <div ref={printAreaRef} id="print-area">
            <ResumePreview  />
          </div>
        </div>
      </ResumeInfoContext.Provider>
    </div>
  );
}

export default ViewResume;
