import {FormProvider} from "react-hook-form"
import { useForm } from "react-hook-form"
import { useAuth } from "../auth/AuthProvider"
import { useState } from "react"
import { useNavigate } from "react-router"
import Input from "../components/Input"
import Button from "../components/Button"
import { LoaderCircle } from "lucide-react"

export default function RegisterPage(){
    
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const {register} = useAuth()
    const methods = useForm();
    const {formState: {errors}, handleSubmit, setError} = methods;

    const onSubmit = async (data) => {
        const {name, email, password} = data
        try{
            setLoading(true)
            await register(name, email, password);
            navigate("/auth/login")
        }catch(err){
            setError("root", {message: "Failed to create an account."})
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
                Register Page
            </h1>
            {
                errors.root && <p className="text-xl text-center text-red-600 font-semibold">
                    {errors.root.message}
                </p>
            }
            <Input 
                name="name" 
                id="name" 
                label="Username"
                className="mb-4"
            />
            <Input 
                name="email" 
                id="email" 
                label="Email Address"
                type="email"
                className="mb-4"
            />
            <Input 
                name="password" 
                id="password" 
                label="Password"
                className="mb-4"
                type="password"
            />
            <Button
                className="w-full"
                type="submit"
                disabled={loading}
            >
                {
                    !loading 
                        ? "Create account" 
                        : <>
                            Creating...
                            <LoaderCircle className="w-5 h-5 text-white animate-spin"/>
                        </>
                }
            </Button>
        </form>
    </FormProvider>
}