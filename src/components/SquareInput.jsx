import {useFormContext} from "react-hook-form"

export default function SquareInput ({name, id, type, defaultValue = 1, disabled}){

    const {register} = useFormContext()

    return <input
        disabled={disabled}
        type={type} 
        name={name}  
        id={id}
        defaultValue={defaultValue}
        className="w-10 h-10 rounded-lg border-2 border-black/20 outline-0 focus:border-red-800 text-center"
        {...register(name)}
    />
}