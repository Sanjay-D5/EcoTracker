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
    <div className='flex min-h-screen'>
        <section className='hidden lg:flex items-center justify-center w-1/2 bg-green-200'>
            <div className='flex flex-col items-center'>
                <img src="/assets/Artboard 2@3x 4.svg" alt="" height={500} width={500} className=''/>
                <div className='text-black space-y-4 top-2/3 w-96'>
                    <h1 className='text-3xl font-bold'>Welcome to Eco Tracker</h1>
                    <p className='text-emerald-800 font-semibold'>Awesome, we've created the perfect place for you to track all your carbon footprint.</p>
                </div>
            </div>
        </section>
        <section className='flex flex-1 flex-col items-center justify-center p-4 py-25 bg-emerald-50'>
            <div className='flex items-center justify-center lg:hidden'>
                <Leaf className='text-emerald-700 h-7 w-7 mr-1'/>
                <h1 className='font-semibold text-xl'>Eco Tracker</h1>
            </div>
            {
                formType === 'sign-in' ? (
                    <SignIn toggleFormType={toggleFormType}/>
                ) : (
                    <SignUp toggleFormType={toggleFormType}/>
                )
            }
        </section>
    </div>
  )
}

export default AuthLayout