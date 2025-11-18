import {useParams} from "react-router"

export default function EditProductPage () {
    const {id} = useParams()
    
    return <h1>
        {id}
    </h1>
}