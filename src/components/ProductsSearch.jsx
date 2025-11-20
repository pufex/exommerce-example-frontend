import { Search } from "lucide-react";

export default function ProductsSearch({value, onChange, className = ""}){
    return <div className={`${className} w-full py-2 px-4 border-2 border-black/20 rounded-full bg-white flex items-center justify-between gap-4 focus-within:border-red-600`}>
        <input 
            type="text"
            value={value}
            onChange={onChange}
            className="w-full h-full border-0 outline-0 text-xl"
        />
        <Search />
    </div>
}