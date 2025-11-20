import IconButton from "../components/IconButton" 
import { FormProvider, useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { useCart } from "../contexts/CartProvider"
import SquareInput from "./SquareInput"
import {Plus, Minus} from "lucide-react"
import Button from "./Button"

export default function ProductCounter ({product}){
    
    const navigate = useNavigate()
    const {addToCart} = useCart()
    const methods = useForm()
    const {getValues, setValue, handleSubmit} = methods

    const handleDecrement = () => {
        const currentCount = Number(getValues("count"))
        if(currentCount > 1){
            setValue("count", currentCount-1)
        }
    }

    const handleIncrement = () => {
        setValue("count", Number(getValues("count")) + 1)
    }

    const onSubmit = (data) => {
        const {count} = data
        addToCart(product, Number(count))
        navigate("/products")
    }

    return <FormProvider {...methods}>
        <form 
            className="flex items-center justify-center gap-2"
            onSubmit={handleSubmit(onSubmit)}
        >
            <IconButton type="button" onClick={handleDecrement}>
                <Minus/>
            </IconButton>
            <SquareInput 
                name="count" 
                id="count" 
                type="text"
                disabled={true}
            />
            <IconButton type="button" onClick={handleIncrement}>
                <Plus/>
            </IconButton>
            <Button type="submit">
                Add
            </Button>
        </form>
    </FormProvider>
}