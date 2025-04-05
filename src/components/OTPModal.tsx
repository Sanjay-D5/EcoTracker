import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { X } from "lucide-react";
import React, { useState } from "react"
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { sendEmailOTP, verifySecret } from "@/lib/actions/user.action";
    

const OTPModal = ({userId, email}: {userId: string; email:string }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const sessionId = await verifySecret({userId, password});

            if(sessionId) navigate("/home")

        } catch (error) {
            console.log("Failed to verify OTP", error);
        }

        setIsLoading(false);
    };

    const handleResendOTP = async () => {
        // call API to resend OTP
        await sendEmailOTP({email});
    };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
    <AlertDialogContent className="space-y-4 max-w-[95%] sm:w-fit rounded-xl px-4 md:px-8 py-8 outline-none">
        <AlertDialogHeader className="relative flex justify-center">
        <AlertDialogTitle className="text-center font-bold">Enter Your OTP 
            <X className="absolute -right-1 -top-6 cursor-pointer hover:bg-gray-300 rounded-xl p-1 h-7 w-7 sm:-right-4" onClick={() => setIsOpen(false)}/>
        </AlertDialogTitle>
        <AlertDialogDescription className="text-center font-medium">
            We've sent a code to <span className="pl-1 text-emerald-500">{email}</span>
        </AlertDialogDescription>
        </AlertDialogHeader>
        
        <InputOTP maxLength={6} value={password} onChange={setPassword}>
        <InputOTPGroup className="space-x-5">
            <InputOTPSlot index={0} className="shadow-emerald-400 ring-emerald-300 shadow-sm text-emerald-700 font-semibold rounded-lg text-xl"/>
            <InputOTPSlot index={1} className="shadow-emerald-400 ring-emerald-300 shadow-sm text-emerald-700 font-semibold rounded-lg text-xl"/>
            <InputOTPSlot index={2} className="shadow-emerald-400 ring-emerald-300 shadow-sm text-emerald-700 font-semibold rounded-lg text-xl"/>
            <InputOTPSlot index={3} className="shadow-emerald-400 ring-emerald-300 shadow-sm text-emerald-700 font-semibold rounded-lg text-xl"/>
            <InputOTPSlot index={4} className="shadow-emerald-400 ring-emerald-300 shadow-sm text-emerald-700 font-semibold rounded-lg text-xl"/>
            <InputOTPSlot index={5} className="shadow-emerald-400 ring-emerald-300 shadow-sm text-emerald-700 font-semibold rounded-lg text-xl"/>
        </InputOTPGroup>
        </InputOTP>
  
        <AlertDialogFooter>
            <div className="flex flex-col gap-4 w-full">
                <AlertDialogAction onClick={handleSubmit} className="bg-emerald-500 hover:bg-emerald-600 rounded-2xl text-white font-semibold"
                >
                    Submit
                    {isLoading && (
                        <img src="/assets/icons/loader-circle.svg" alt="loader" width={24} height={24} className="ml-2 animate-spin" />
                    )}    
                </AlertDialogAction>

                <div className="text-center mt-1">
                    Didn't get a code? 
                    <Button className="text-emerald-400" onClick={handleResendOTP}>
                        Click to resend
                    </Button>
                </div>
            </div>
        
        </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>

  )
}

export default OTPModal