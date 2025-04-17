import { Leaf } from 'lucide-react'
import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

type FormType = 'sign-in' | 'sign-up';

type AuthLayoutProps = {
    initialFormType: FormType;
}

const AuthLayout = ({initialFormType}: AuthLayoutProps) => {
    const [formType, setFormType] = useState<FormType>(initialFormType);

    const toggleFormType = () => {
        setFormType((prevType) => (prevType === 'sign-in'? 'sign-up' : 'sign-in'))
    }

  return (
    <div className="flex min-h-screen lg:flex-row">
        {/* Left section - visible on medium screens and up */}
        <section className="hidden md:flex md:w-1/2 items-center justify-center bg-green-200 p-4">
            <div className="flex flex-col items-center max-w-md">
                <div className="relative w-full aspect-square max-w-md">
                    <img 
                        src="/assets/Artboard 2@3x 4.svg" 
                        alt="Eco Tracker Illustration" 
                        className="w-full h-auto object-contain"
                    />
                </div>
                <div className="text-black space-y-2 md:space-y-4 w-full px-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left">Welcome to Eco Tracker</h1>
                    <p className="text-emerald-800 font-semibold text-sm md:text-base text-center md:text-left">
                        Awesome, we've created the perfect place for you to track all your carbon footprint.
                    </p>
                </div>
            </div>
        </section>

        {/* Right section - form area */}
        <section className="flex flex-1 flex-col md:flex md:w-1/2 items-center justify-center p-4 md:p-6 lg:p-8 bg-emerald-50">
            {/* Logo for mobile only */}
            <div className="flex items-center justify-center mb-6 md:hidden">
                <Leaf className="text-emerald-700 h-6 w-6 mr-1"/>
                <h1 className="font-semibold text-lg">Eco Tracker</h1>
            </div>
            
            {/* Tablet+ Logo */}
            <div className="hidden md:flex md:lg:hidden items-center mb-8">
                <Leaf className="text-emerald-700 h-7 w-7 mr-2"/>
                <h1 className="font-semibold text-xl">Eco Tracker</h1>
            </div>
            
            {/* Auth Forms */}
            <div className="w-full max-w-md">
                {formType === 'sign-in' ? (
                    <SignIn toggleFormType={toggleFormType}/>
                ) : (
                    <SignUp toggleFormType={toggleFormType}/>
                )}
            </div>
        </section>
    </div>
  )
}

export default AuthLayout