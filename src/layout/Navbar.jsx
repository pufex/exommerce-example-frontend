import NavLogo from "../components/NavLogo"
import { Outlet } from "react-router"
import { Link } from "react-router"

const links = [
    {
        to: "/auth/login",
        name: "Login"
    },
    {
        to: "/auth/register",
        name: "Register"
    }
]

export default function Navbar() {
    return <>
        <div className="w-full h-20"/>
        <nav className="w-full h-20 fixed top-0 left-0 bg-red-600 border-b-2 border-b-red-900">
            <div className="w-full h-full px-4 max-w-7xl mx-auto flex items-center justify-between">
                <NavLogo />
                <ul className="flex gap-4 items-center">
                    {
                        links.map((link, index) => (
                            <li key={index}>
                                <Link 
                                    to={link.to}
                                    className="text-lg text-white font-semibold" 
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </nav>
        <main className="w-full max-w-7xl mx-auto">
            <Outlet />
        </main>
    </>
    
}