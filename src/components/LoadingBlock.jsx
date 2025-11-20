import {LoaderCircle} from "lucide-react"

export default function LoadingBlock () {
    return <div className="w-full py-20 flex items-center justify-center">
        <LoaderCircle className="w-10 h-10 animate-spin text-red-600" />
    </div>
}