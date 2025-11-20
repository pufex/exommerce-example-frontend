import { useForm, FormProvider } from "react-hook-form"
import { useAuth } from "../auth/AuthProvider";
import { useState } from "react";
import Input from "../components/Input"
import Button from "../components/Button"
import {LoaderCircle} from "lucide-react"
import { AxiosError } from "axios";

export default function LoginPage(){
    
    const [loading, setLoading] = useState();
    const {login} = useAuth()
    const methods = useForm();
    const {formState: {errors}, handleSubmit, setError} = methods;

    const onSubmit = async (data) => {
        try{
            const {email, password} = data
            setLoading(true)
            await login(email, password)
        }catch(err){
            if(err instanceof AxiosError){
                switch(err?.response?.status){
                    case 400:
                        setError("root", {
                            message: "Invalid login credentials."
                        })
                        break;
                    case 401:
                        setError("root", {message: "Invalid email or password."})
                        break;
                    default: 
                        setError("root", {message: "There was an error with logging in."})
                        break

                }
            }else{
                setError("root", {message: "There was an error with logging in."})
            }
        }finally{
            setLoading(false)
        }
    }

    return <FormProvider {...methods}>
        <form 
            className="w-full max-w-lg mx-auto px-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h1 className="text-center text-3xl py-6 font-bold">
                Login Page
            </h1>
            {
                errors.root && <p className="text-xl text-center text-red-600 font-semibold">
                    {errors.root.message}
                </p>
            }
            <Input 
                name="email" 
                id="email" 
                label="Email Address"
                className="mb-4"
                registerOptions={{
                    required: "Required",
                }}
            />
            <Input 
                name="password" 
                id="password" 
                label="Password"
                className="mb-4"
                type="password"
                registerOptions={{
                    required: "Required"
                }}
            />
            <Button
                className="w-full"
                type="submit"
                disabled={loading}
            >
                {
                    !loading
                        ? "Log in"
                        : <>
                            Logging in...
                            <LoaderCircle className="w-5 h-5 text-white animate-spin"/>
                        </>
                }
            </Button>
        </form>
    </FormProvider>
}