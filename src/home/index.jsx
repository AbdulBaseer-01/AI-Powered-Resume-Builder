import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Brain, Zap, Star, Users, Trophy, Check, ArrowRight, FileText, Download, Edit3, Menu, X } from "lucide-react";
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'
import {useState} from 'react'
import { useNavigate } from "react-router-dom";

function Home() {
  const {isSignedIn}=useUser();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
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
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-[#5e2eff] to-[#9b50ff] text-white border-0 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Resume Builder
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Create a <span className="bg-gradient-to-r from-[#5e2eff] to-[#9b50ff] bg-clip-text text-transparent">Professional Resume</span> in Minutes
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Our AI analyzes your experience and crafts compelling, ATS-optimized resumes that get you noticed by recruiters. Stand out from the crowd with intelligent formatting and industry-specific keywords.
            </p>
            <div className="flex flex-col sm:flex-row justify-center mb-12">
                
                {isSignedIn ? (
              <>
                <Link to="/dashboard">
                  <Button size="lg" onClick={()=>navigate('/auth/sign-in')} className="bg-gradient-to-r from-[#5e2eff] to-[#9b50ff] hover:opacity-90 text-white px-8 py-3">
                    Build My Resume
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/auth/sign-in">
                  <Button size="lg" onClick={()=>navigate('/auth/sign-in')} className="bg-gradient-to-r from-[#5e2eff] to-[#9b50ff] hover:opacity-90 text-white px-8 py-3">
                    Build My Resume
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </>
            )}
            </div>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                0+ resumes created
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                6.9/5 rating
              </div>
              <div className="flex items-center">
                <Trophy className="w-4 h-4 mr-2" />
                69% success rate
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powered by Advanced AI Technology
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our intelligent system understands what recruiters want and optimizes your resume for maximum impact.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">AI Content Generation</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  Our AI analyzes your background and generates compelling bullet points that highlight your achievements and skills.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">ATS Optimization</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  Ensure your resume passes through Applicant Tracking Systems with optimized keywords and formatting.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Edit3 className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Smart Templates</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  Choose from professionally designed templates that adapt to your industry and experience level.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose Our AI Resume Builder?
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#5e2eff] to-[#9b50ff] rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">10x Faster Creation</h4>
                    <p className="text-gray-600">Build a professional resume in minutes, not hours. Our AI does the heavy lifting.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#5e2eff] to-[#9b50ff] rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Industry-Specific Keywords</h4>
                    <p className="text-gray-600">Get noticed with keywords tailored to your specific industry and role.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#5e2eff] to-[#9b50ff] rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Professional Templates</h4>
                    <p className="text-gray-600">Choose from dozens of professionally designed templates that impress recruiters.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#5e2eff] to-[#9b50ff] rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Real-Time Optimization</h4>
                    <p className="text-gray-600">Get instant feedback and suggestions to improve your resume's effectiveness.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-r from-[#5e2eff] to-[#9b50ff] rounded-2xl shadow-2xl flex items-center justify-center animate-float">
                <FileText className="w-32 h-32 text-white opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by Job Seekers Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what our users have to say about their experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "I landed my dream job within 2 weeks of using ResumeAI. The AI suggestions were spot-on and saved me hours of writing."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Aqib Khan</p>
                    <p className="text-sm text-gray-600">Software Engineer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "The ATS optimization feature is incredible. My resume now gets past the initial screening and I'm getting more interviews."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Aqib Who</p>
                    <p className="text-sm text-gray-600">Marketing Manager</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "As a career changer, I was struggling to write my resume. ResumeAI helped me highlight transferable skills perfectly."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Aqib Why??</p>
                    <p className="text-sm text-gray-600">Data Analyst</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      
      <section className="py-20 bg-gradient-to-r from-[#5e2eff] to-[#9b50ff]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful job seekers who've used our AI-powered resume builder to advance their careers.
          </p>
            {isSignedIn ? (
              <>
                <Link to="/dashboard">
                  <Button size="lg" onClick={()=>navigate('/auth/sign-in')} variant="outline" className="bg-white hover:bg-gray-100 text-[#5e2eff] px-8 py-3">
                    Start Building Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/auth/sign-in">
                  <Button size="lg" onClick={()=>navigate('/auth/sign-in')} className="bg-gradient-to-r from-[#5e2eff] to-[#9b50ff] hover:opacity-90 text-white px-8 py-3">
                    Start Building Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </>
            )}
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-hero-gradient rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">CareerOS</span>
              </div>
              <p className="text-gray-400">
                The smartest way to build professional resumes that get you hired.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CareerOS. All rights not reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
