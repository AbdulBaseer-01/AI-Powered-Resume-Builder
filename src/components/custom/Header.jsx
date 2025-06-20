import { Button } from "@/components/ui/button";
import { Brain,  Menu, X } from "lucide-react";
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'
import {useState} from 'react'


function Header() {
    const {isSignedIn}=useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
    return( <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-[#5e2eff] to-[#9b50ff] rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">CareerOS</span>
            </div>
  
            <div className="hidden md:flex items-center space-x-8">
              
              {isSignedIn ? (
                            <>
                              <Link to="/">
                                <Button className="text-white bg-gradient-to-r from-[#5e2eff] to-[#9b50ff] hover:text-brand-blue transition-colors"> Home </Button>
                              </Link>
                            </>
                          ) : (
                            <>
                              <Link to="/auth/sign-in">
                                <Button className="text-white bg-gradient-to-r from-[#5e2eff] to-[#9b50ff] hover:text-brand-blue transition-colors"> Home </Button>
                              </Link>
                            </>
                          )}
              <a href="#features" className="text-gray-600 hover:text-brand-blue transition-colors">Features</a>
              <a href="#testimonials" className="text-gray-600 hover:text-brand-blue transition-colors">Reviews</a>
              {isSignedIn ? (
                <>
                  <Link to="/dashboard">
                    <Button variant="outline">My Resumes</Button>
                  </Link>
                  <UserButton />
                </>
              ) : (
                <>
                  <Link to="/auth/sign-in">
                    <Button variant="outline" className="mr-2">Sign In</Button>
                  </Link>
                  <Link to="/auth/sign-up">
                    <Button className="bg-gradient-to-r from-[#5e2eff] to-[#9b50ff] hover:opacity-90">Get Started</Button>
                  </Link>
                </>
              )}
            </div>
  
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
  
          {isMenuOpen && (
            <div className="md:hidden mt-4 flex flex-col gap-4 bg-white p-4 rounded-lg shadow-md">
              {isSignedIn ? (
                            <>
                              <Link to="/">
                                <Button className="text-white bg-gradient-to-r from-[#5e2eff] to-[#9b50ff] hover:text-brand-blue transition-colors"> Home </Button>
                              </Link>
                            </>
                          ) : (
                            <>
                              <Link to="/auth/sign-in">
                                <Button className="text-white bg-gradient-to-r from-[#5e2eff] to-[#9b50ff] hover:text-brand-blue transition-colors"> Home </Button>
                              </Link>
                            </>
                          )}
              <a href="#features" className="text-gray-600 hover:text-brand-blue transition-colors">Features</a>
              <a href="#testimonials" className="text-gray-600 hover:text-brand-blue transition-colors">Reviews</a>
              {isSignedIn ? (
                <>
                  <Link to="/dashboard">
                    <Button variant="outline">My Resumes</Button>
                  </Link>
                  <UserButton />
                </>
              ) : (
                <>
                  <Link to="/auth/sign-in">
                    <Button variant="outline" className="mr-2">Sign In</Button>
                  </Link>
                  <Link to="/auth/sign-up">
                    <Button className="bg-gradient-to-r from-[#5e2eff] to-[#9b50ff] hover:opacity-90">Get Started</Button>
                  </Link>
                </>
              )}
              </div>
            )}
        </div>
      </nav>
  )
}

export default Header

