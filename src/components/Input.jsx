import {useFormContext} from "react-hook-form"

export default function Input ({className ="", id, label, name = "", type, registerOptions}) {
    
    const {register, formState: {errors}} = useFormContext()
    
    return <div className={`${className} w-full flex flex-col gap-2`}>
        <div className="w-full flex items-center justify-between">
            {
                label && <label 
                    htmlFor={id}
                    className="text-lg text-black"
                >
                    {label}
                </label>
            }
            {
                errors[name] && <label 
                    htmlFor={id}
                    className="text-lg text-red-500 font-medium"
                >
                    {errors[name].message}
                </label>
            }
        </div>
        <input 
            type={type} 
            name={name}
            id={id}
            className="w-full px-2 h-10 border border-black/20 rounded-lg text-lg text-black focus:border-red-800 outline-0 focus:border-4"
            {...register(name, registerOptions)}
        />
    </div>
}