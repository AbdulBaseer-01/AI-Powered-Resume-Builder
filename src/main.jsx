import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignInSignUpPage from './auth/sign-in/index.jsx'
import Home from './home/index.jsx'
import Dashboard from './dashboard/index.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import EditResume from './dashboard/resume/[resumeId]/edit/index.jsx'
import ViewResume from './resume2/resumeId/view/index.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const router = createBrowserRouter([
  {
    element: < App />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard/>
      },
      {
        path: '/dashboard/resume/:resumeId/edit',
        element: <EditResume />
      }
    ]
  },
  {  
    path: '/',
    element: <Home/>
  },
  {
    path: '/auth/sign-in',
    element: <SignInSignUpPage />
  },
  {
    path: '/auth/sign-up',
    element: <SignInSignUpPage />
  },
  {
    path:'/resume2/:resumeId/view',
    element: <ViewResume/>
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <ClerkProvider 
    publishableKey={PUBLISHABLE_KEY} 
    afterSignOutUrl='/'>
      <RouterProvider router = {router}/>
    </ClerkProvider>
  </React.StrictMode>,

)