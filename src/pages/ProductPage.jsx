import {useParams} from "react-router"

export default function ProductPage(){

    const {id: product_id} = useParams()

    return <h1>
        {product_id}
    </h1>
}