import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { createAccount, login } from "@/appwrite/actions/authServices"
import toast from "react-hot-toast"


type FormType = "sign-in" | "sign-up";

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email({ message: "Invalid email address" }),
    fullName: formType === "sign-up"
      ? z.string().min(2, "Full name must be at least 2 characters").max(50, "Full name must be under 50 characters")
      : z.string().optional(),
    password: z.string()
      .min(8, "Password must be at least 8 characters") // Increased from 6
      .max(100, "Password must be under 100 characters")
      .refine(val => /[A-Z]/.test(val), "Password must contain at least one uppercase letter")
      .refine(val => /[0-9]/.test(val), "Password must contain at least one number"),
  });
};

const AuthForm = ({ type, toggleFormType }: { type: FormType, toggleFormType: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const formSchema = authFormSchema(type);
   // 1. Define your form.
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");
  
    try {
      if (type === "sign-up") {
        await createAccount(
          values.email,
          values.password,
          values.fullName || ""
        );
        toast.success("Account created successfully!");
        navigate("/home/dashboard");
      } else {
        await login(values.email, values.password);
        toast.success("Logged in successfully!");
        navigate("/home/dashboard");
      }
      // Redirect or show success message here
    } catch (error: any) {
      console.error("Authentication error:", error);
      
      // Extract meaningful error message
      const errorMsg = 
        error.message || 
        (error.response?.message) || 
        `Failed to ${type === "sign-up" ? "create account" : "sign in"}. Please try again.`;
      
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="space-y-1">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your password" {...field} className="ring-offset-transparent border-none
                      focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"/>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          
          <Button type="submit" className="w-full rounded-3xl bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
          {isLoading ? (
              <>
                {type === 'sign-in' ? 'Signing In...' : 'Signing Up...'}
                <svg className="animate-spin ml-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </>
            ) : (
              type === 'sign-in' ? 'Sign In' : 'Sign Up'
            )}
          </Button>

        {errorMessage && <div className="px-4 py-3 rounded-lg bg-red-50 text-red-500 text-sm">{errorMessage}</div>}

        <div className="flex justify-center">
          <p>{type === 'sign-in' ? "Don't have an account?" : "Already have an account"}</p>
          <Link 
            to={type === 'sign-in' ? '/sign-up' : '/sign-in'} 
            onClick={toggleFormType}
            className="ml-1 font-medium text-emerald-600 hover:text-emerald-800"
          >
            {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
          </Link>
        </div>
        </form>
      </Form>
    </div>
  )
}

export default AuthForm