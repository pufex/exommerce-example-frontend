import NavLogo from "../components/NavLogo"
import { Outlet } from "react-router"
import { Link } from "react-router"
import UnloggedComponent from "../auth/components/UnloggedComponent.jsx"
import PrivateComponent from "../auth/components/PrivateComponent.jsx"
import LogoutNavButton from "../auth/components/LogoutNavButton.jsx"
import AdminComponent from "../auth/components/AdminComponent.jsx"
import { ShoppingCartIcon } from "lucide-react"

export default function Navbar() {
    return <>
        <div className="w-full h-20" />
        <nav className="w-full h-20 fixed top-0 left-0 bg-red-600 border-b-2 border-b-red-900">
            <div className="w-full h-full px-4 max-w-7xl mx-auto flex items-center justify-between">
                <NavLogo />
                <ul className="flex gap-4 items-center">
                    <li>
                        <Link 
                            to="/products"
                            className="text-white text-lg font-semibold"
                        >   
                            Browse
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/cart"
                            className="text-white"
                        >   
                            <ShoppingCartIcon className="w-8 h-8 text-white"/>
                        </Link>
                    </li>
                    <UnloggedComponent>

                        <li>
                            <Link
                                to={"/auth/login"}
                                className="text-lg text-white font-semibold"
                            >
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/auth/register"}
                                className="text-lg text-white font-semibold"
                            >
                                Register
                            </Link>
                        </li>
                    </UnloggedComponent>
                    <PrivateComponent>
                        <li>
                            <LogoutNavButton />
                        </li>
                    </PrivateComponent>
                    <AdminComponent>
                        <li>
                            <Link
                                to={"/admin/products"}
                                className="text-lg text-white font-semibold"
                            >
                                Dashboard
                            </Link>
                        </li>
                    </AdminComponent>
                </ul>
            </div>
        </nav>
        <main className="w-full max-w-7xl mx-auto">
            <Outlet />
        </main>
    </>

}