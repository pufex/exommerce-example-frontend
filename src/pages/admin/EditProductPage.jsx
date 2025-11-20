import { useEffect, useState } from "react"
import {useParams, useNavigate} from "react-router"
import { useAxiosPrivate } from "../../auth/hooks/useAxiosPrivate"
import { LoaderCircle } from "lucide-react"
import { FormProvider, useForm } from "react-hook-form"
import Input from "../../components/Input"
import Textarea from "../../components/Textarea"
import Button from "../../components/Button"

export default function EditProductPage () {
    const {id} = useParams()
    const navigate = useNavigate()
    const axiosPrivate = useAxiosPrivate()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [product, setProduct] = useState(null)
    const [formLoading, setFormLoading] = useState(false);


    const methods = useForm()
    const {formState: {errors}, handleSubmit, setError: setFormError} = methods

    const onSubmit = async (data) => {
        try{
            setFormLoading(true)
            await axiosPrivate.patch(`/admin/edit-product/${id}`, data)
            navigate("/admin/products")
        }catch(err){
            console.log(err)
            setFormError("root", {message: "Failed to edit this item."})
        }finally{
            setFormLoading(false)
        }
    }

    useEffect(() => {

        const fetchProduct = async () => {
            try{
                setLoading(true)
                const response = await axiosPrivate.get(`/admin/products/${id}`)
                setProduct(response.data)
                console.log(response.data)
            }catch(err){
                setError("There is no product with this id.")
            }finally{
                setLoading(false)
            }
        }

        fetchProduct()
    }, [id])

    return loading
        ? <div className="w-full py-20 flex items-center justify-center">
            <LoaderCircle className="w-10 h-10 animate-spin text-red-600" />
        </div>
        : error
            ? <h1 className="w-full py-10 text-center text-red-600 text-2xl font-semibold">
                {error}
            </h1>
            : <FormProvider {...methods}>
                    <form
                        className="w-full max-w-md mx-auto py-8 px-4"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <h1 className="w-full text-center text-2xl font-bold text-black pb-8">
                            Edit this product
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
                            defaultValue={product.title}
                        />
                        <Textarea 
                            id="description"
                            name="description"
                            label="Description"
                            className="mb-2"
                            defaultValue={product.description}
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
                            defaultValue={product.price}
                            registerOptions={{
                                required: "Required"
                            }}
                        />
                        <Input
                            id="instock"
                            name="instock"
                            type="number"
                            label="In stock"
                            defaultValue={product.instock}
                            className="mb-2"
                            registerOptions={{
                                required: "Required",
                            }}
                        />
                        <Input
                            id="photoURL"
                            name="photoURL"
                            label="Photo URL"
                            defaultValue={product.photoURL}
                            className="mb-4"
                            registerOptions={{
                                required: "Required",
                            }}
                        />
                        <Button
                            className={"w-full"}
                            disabled={formLoading}
                            type="submit"
                        >
                            {
                                !formLoading
                                    ? "Edit product"
                                    : <>
                                        Saving...
                                        <LoaderCircle className="w-6 h-6 text-white animate-spin"/>
                                    </>
                            }
                        </Button>
                    </form>
                </FormProvider>
}