import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/clerk-react"
import { Navigate, Outlet } from 'react-router-dom'
import Header from "./components/custom/Header";
import { Toaster } from "sonner";

function App() {
  const { isLoaded, isSignedIn } = useUser();

  if(!isSignedIn&&isLoaded){
    return <Navigate to = {'/auth/sign-in'}/>
  }
  return (
    <>
      <Header/>
      <Outlet/>
      <Toaster/>
    </>
  )
}

export default App