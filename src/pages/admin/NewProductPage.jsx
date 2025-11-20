import { FormProvider, useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { useAxiosPrivate } from "../../auth/hooks/useAxiosPrivate"
import Button from "../../components/Button"
import Input from "../../components/Input"
import Textarea from "../../components/Textarea"
import { LoaderCircle } from "lucide-react"

export default function NewProductPage(){

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate()
    const methods = useForm()
    const {formState: {errors}, handleSubmit, setError} = methods;

    const onSubmit = async (data) => {
        console.log(data)
        data.price = Number(data.price)
        try{
            setLoading(true)
            await axiosPrivate.post("/admin/create-product", data)
            navigate("/admin/products")
        }catch(err){
            console.log(err)
            setError("root", {message: "Failed to create a new product"})
        }finally{
            setLoading(false)
        }
    }


    return <FormProvider {...methods}>
        <form
            className="w-full max-w-md mx-auto py-8 px-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h1 className="w-full text-center text-2xl font-bold text-black pb-8">
                Create a product
            </h1>

            {
                errors.root && <p className="text-xl text-red-600 font-semibold text-center mb-2">
                    {errors.root.message}
                </p>
            }

            <Input 
                id="title"
                name="title"
                label="Title"
                registerOptions={{
                    required: "Required"
                }}
                className="mb-2"
            />
            <Textarea 
                id="description"
                name="description"
                label="Description"
                className="mb-2"
                registerOptions={{
                    required: "Required",
                    minLenght: {
                        value: 5,
                        message: "Min. 5 char."
                    },
                    maxLenght: {
                        value: 200,
                        message: "Max. 200 char."
                    }
                }}
            />
            <Input
                id="price"
                name="price"
                label="Price"
                className="mb-2"
                registerOptions={{
                    required: "Required"
                }}
            />
            <Input
                id="instock"
                name="instock"
                type="number"
                label="In stock"
                className="mb-2"
                registerOptions={{
                    required: "Required",
                }}
            />
            <Input
                id="photoURL"
                name="photoURL"
                label="Photo URL"
                className="mb-4"
                registerOptions={{
                    required: "Required",
                }}
            />
            <Button
                className={"w-full"}
                disabled={loading}
                type="submit"
            >
                {
                    !loading
                        ? "Create product"
                        : <>
                            Creating product
                            <LoaderCircle className="w-6 h-6 text-white animate-spin"/>
                        </>
                }
            </Button>
        </form>
    </FormProvider>
}