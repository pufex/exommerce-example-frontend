import { useNavigate } from "react-router"

export default function NavLogo () {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/home")
    }

    return <h1 
        className={"text-4xl font-extrabold text-white cursor-pointer"}
        onClick={() => handleClick()}
    >
        ECOMMERCE
    </h1>
}