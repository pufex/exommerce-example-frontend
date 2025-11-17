import NavLogo from "../components/NavLogo"
import { Link } from "react-router"

const links = [
    {
        to: "/auth/login",
    },
    {
        to: "/auth/register"
    }
]

export default function Navbar() {
    return <>
        <div className="w-full h-20"/>
        <nav className="w-full h-20 fixed top-0 left-0 bg-red-600 border-b-2 border-b-red-900">
            <div className="w-full h-full px-4 max-w-7xl mx-auto flex items-center justify-between">
                <NavLogo />
            </div>
            <ul className="flex space-4 items-center">
                {
                    links.map((link, index) => (
                        <li key={index}>
                            <Link 
                                to={link.to}
                                className="text-lg text-white font-semibold" 
                            />
                        </li>
                    ))
                }
            </ul>
        </nav>
    </>
    
}