import { Loader2Icon, MoreVertical, Notebook, FileText } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import GlobalApi from './../../../service/GlobalApi'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function ResumeItem({ resume, refreshData }) {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const onDelete = async () => {
  try {
    setLoading(true);
    await GlobalApi.DeleteResumeById(resume.documentId); 
    toast.success("Resume deleted successfully");
    setOpenAlert(false);
    refreshData(); 
  } finally {
    setLoading(false);
    window.location.reload()
  }
};


  return (
    <Card className="rounded-2xl shadow-2xl border bg-black border-gray-800 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition duration-300 group overflow-hidden max-w-sm w-full">
  <div className="relative">
    <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
      <div className="h-[180px] flex items-center justify-center bg-gradient-to-br from-[#f9f9ff] via-[#ffffff] to-[#eef5ff]">
        <FileText className="text-primary group-hover:scale-110 transition-transform duration-300" size={40} />
      </div>
    </Link>
  </div>

  <CardContent className="p-0">
    <CardHeader
      className="flex justify-between items-center mt-4 px-4 py-3 rounded-t-lg"
      style={{ backgroundColor: resume?.themeColor }}
    >
      <h2 className="text-sm font-semibold text-white truncate max-w-[80%]">{resume.title}</h2>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical className="h-4 w-4 cursor-pointer text-white hover:text-gray-200" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white shadow-md rounded-md text-sm">
          <DropdownMenuItem onClick={() => navigate(`/dashboard/resume/${resume.documentId}/edit`)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate(`/resume2/${resume.documentId}/view`)}>
            View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate(`/resume2/${resume.documentId}/view`)}>
            Download
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenAlert(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </CardHeader>

    <CardContent
      className="px-4 pb-4 text-white text-xs italic rounded-b-lg"
      style={{ backgroundColor: resume?.themeColor }}
    >
      Last updated: {new Date(resume.updatedAt || Date.now()).toLocaleDateString()}
    </CardContent>
  </CardContent>

  <AlertDialog open={openAlert}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your resume and remove it from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={onDelete} disabled={loading}>
          {loading ? <Loader2Icon className="animate-spin w-4 h-4" /> : 'Delete'}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</Card>

  );
}

export default ResumeItem;
