import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Link } from "react-router-dom"
import { createAccount, signInUser } from "@/lib/actions/user.action"
import OTPModal from "./OTPModal"


type FormType = "sign-in" | "sign-up";

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email(),
    fullName: formType === "sign-up" ? z.string().min(2).max(50) : z.string().optional(),
  });
}

const AuthForm = ({ type, toggleFormType }: { type: FormType, toggleFormType: () => void }) => {
  const [isLoading, setisLoading] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const [userId, setUserId] = useState(null);

  const formSchema = authFormSchema(type);
   // 1. Define your form.
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: ""
    },
  })
 
  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setisLoading(true);
    seterrorMessage("");

    try {
      const user = type === "sign-in" 
      ? await createAccount({
          fullName: values.fullName || "",
          email: values.email,
        })
      : await signInUser({email: values.email});

      setUserId(user.userId);
    } catch (error) {
      seterrorMessage("Failed to create account. Please try again.");
    } finally {
      setisLoading(false);
    }
    
  };


  return (
    <div className="flex items-center justify-center flex-col">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex max-h-[800px] w-full max-w-[580px] flex-col justify-center space-y-4 transition-all lg:h-full lg:space-y-5 shadow-sm p-4 rounded-xl">
          <h1 className="font-bold text-2xl text-center mt-4">{type === "sign-in" ? "Sign In" : "Sign Up"}</h1>
          {type === 'sign-up' && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className="space-y-1">
                    <FormLabel>Full Name</FormLabel>

                    <FormControl>
                      <Input placeholder="Enter your full name" className="ring-offset-transparent border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0" {...field}/>
                    </FormControl>
                  </div>
                  
                  <FormMessage />
                </FormItem>

              )}
            />
          )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="space-y-1">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} className="ring-offset-transparent border-none
                      focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"/>
                    </FormControl>
                  </div>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
          <Button type="submit" className="w-full rounded-3xl bg-emerald-700 hover:bg-emerald-500" disabled={isLoading}>
            {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
            {isLoading && (
              <img src="/assets/icons/loader-circle.svg" alt="load" width={24} height={24} className="animate-spin ml-2"/>
            )}
          </Button>

        {errorMessage && <p className="mx-auto w-fit rounded-xl px-8 py-4 text-center text-red-500">{errorMessage}</p>}

        <div className="flex justify-center">
          <p>{type === 'sign-in' ? "Don't have an account?" : "Already have an account"}</p>
          <Link 
            to={type === 'sign-in' ? '/sign-up' : '/sign-in'} 
            onClick={toggleFormType}
            className="ml-1 font-medium text-emerald-700"
          >
            {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
          </Link>
        </div>
        </form>
      </Form>

      {/* OTP Verification */}
      {userId && (
        <OTPModal email={form.getValues("email")} userId={userId} />
      )}
    </div>
    
  )
}


export default AuthForm