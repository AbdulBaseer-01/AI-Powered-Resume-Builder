import React from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { useLocation } from 'react-router-dom';

const clerkAppearance = {
  layout: {
    socialButtonsVariant: 'iconButton',
    termsPageUrl: '',
  },
  variables: {
    colorPrimary: '#5e2eff',
  },
  elements: {
    formButtonPrimary: 'bg-gradient-to-r from-[#5e2eff] to-[#9b50ff]  text-white font-bold py-2 rounded',
  },
};

export default function SignInSignUpPage() {
  const location = useLocation();
  const isSignUp = location.pathname.includes('sign-up');

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#5e2eff] to-[#9b50ff] flex justify-center items-center px-4">
      <div className="w-full max-w-md p-4 bg-white rounded-xl shadow-lg">
        {isSignUp ? (
          <SignUp
            appearance={clerkAppearance}
            signInUrl="/auth/sign-in"
            redirectUrl="/dashboard"
          />
        ) : (
          <SignIn
            appearance={clerkAppearance}
            signUpUrl="/auth/sign-up"
            redirectUrl="/dashboard"
          />
        )}
      </div>
    </div>
  );
}
