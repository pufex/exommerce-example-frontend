import {FormProvider} from "react-hook-form"
import { useForm } from "react-hook-form"
import Input from "../components/Input"
import Button from "../components/Button"

export default function RegisterPage(){
    
    const methods = useForm();
    const {formState: {errors}} = methods;

    return <FormProvider {...methods}>
        <form 
            className="w-full max-w-lg mx-auto px-4"
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
            >
                Create Account
            </Button>
        </form>
    </FormProvider>
}