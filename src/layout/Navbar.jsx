import NavLogo from "../components/NavLogo"
import { Outlet } from "react-router"
import { Link } from "react-router"
import UnloggedComponent from "../auth/components/UnloggedComponent.jsx"
import PrivateComponent from "../auth/components/PrivateComponent.jsx"
import LogoutNavButton from "../auth/components/LogoutNavButton.jsx"
import AdminComponent from "../auth/components/AdminComponent.jsx"
import CartButton from "../components/CartButton.jsx"
import { useWindowSize } from "../hooks/useWindowSizes.jsx"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"
import LogoutListButton from "../auth/components/LogoutListButton.jsx"
import Button from "../components/Button.jsx"
import UserBubble from "../auth/components/UserBubble.jsx"

export default function Navbar() {

    const navigate = useNavigate()
    const { width: windowWidth } = useWindowSize()
    const [toggleMenu, setToggleMenu] = useState(false)

    const handleMenuClick = () => {
        setToggleMenu(prev => !prev)
    }

    const navigateAndClose = (page) => {
        navigate(page)
        setToggleMenu(false)
    }

    return <>
        <div className="w-full h-20" />
        <nav className="w-full h-20 fixed top-0 left-0 bg-red-600 border-b-2 border-b-red-900 z-50">
            <div className="w-full h-full px-4 max-w-7xl mx-auto flex items-center justify-between">
                <NavLogo />
                <ul className="flex gap-4 items-center">
                    <li>
                        <CartButton />
                    </li>
                    {
                        windowWidth > 750
                            ? <>
                                <li>
                                    <Link
                                        to="/products"
                                        className="text-white font-semibold text-lg"
                                    >
                                        Browse
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
                            </>
                            : <li onClick={handleMenuClick}>
                                {
                                    !toggleMenu
                                        ? <Menu className="w-8 h-8 text-white" />
                                        : <X className="w-8 h-8 text-white" />
                                }
                            </li>
                    }
                    <UserBubble />
                </ul>
            </div>
        </nav>
        {
            windowWidth <= 750 && toggleMenu
                ? <div className="w-full h-screen fixed z-40 top-0 left-0 bg-gray-200 pt-20">
                    <ul className="w-full h-full flex flex-col items-center justify-center gap-4 px-4 py-4">
                        <li
                            className="w-full max-w-sm"
                            onClick={() => navigateAndClose("/products")}
                        >
                            <Button className={"w-full max-w-sm mx-auto"}>
                                Browse
                            </Button>
                        </li>
                        <UnloggedComponent>
                            <li className="w-full max-w-sm">
                                <Button
                                    className={"w-full"}
                                    onClick={() => navigateAndClose("/auth/login")}
                                >
                                    Login
                                </Button>
                            </li>
                            <li className="w-full max-w-sm">
                                <Button
                                    className={"w-full"}
                                    onClick={() => navigateAndClose("/auth/register")}
                                >
                                    Register
                                </Button>
                            </li>
                        </UnloggedComponent>
                        <PrivateComponent>
                            <li className="w-full max-w-sm mx-auto">
                                <LogoutListButton />
                            </li>
                        </PrivateComponent>
                        <AdminComponent>
                            <li className="w-full max-w-sm">
                                <Button
                                    className={"w-full"}
                                    onClick={() => navigateAndClose("/admin/products")}
                                >
                                    Dashboard
                                </Button>
                            </li>
                        </AdminComponent>
                    </ul>
                </div>
                : null
        }
        <main className="w-full max-w-7xl mx-auto">
            <Outlet />
        </main>
    </>

}