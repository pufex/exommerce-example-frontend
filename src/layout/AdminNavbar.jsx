import { Link, Outlet, useNavigate } from "react-router";
import { useWindowSize } from "../hooks/useWindowSizes";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Button from "../components/Button";

export default function AdminNavbar() {
  const navigate = useNavigate()
  const { width: windowWidth } = useWindowSize()
  const [displayMenu, setDisplayMenu] = useState(false)

  const showMenu = () => {
    setDisplayMenu(true)
  }

  const hideMenu = () => {
    setDisplayMenu(false)
  }

  const navigateAndClose = (to) => {
    navigate(to)
    hideMenu()
  } 

  return <>
    <div className="w-full h-20" />
    <nav className="z-50 fixed top-0 left-0 w-full h-20 bg-red-600 border-b-2 border-b-red-800">
      <div className="w-full max-w-7xl h-full mx-auto px-4 flex justify-between items-center">
        <h1
          className="text-3xl text-white font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          ADMIN
        </h1>
        {
          windowWidth > 600
          ? <ul className="flex items-center gap-4">
            <li>
              <Link
                className="text-white text-xl font-semibold"
                to="/admin/products"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                className="text-white text-xl font-semibold"
                to="/admin/new-product"
              >
                Create a product
              </Link>
            </li>
          </ul>
          : !displayMenu
          ? <Menu 
            className="w-8 h-8 text-white"
            onClick={showMenu}
          />
          : <X
            onClick={hideMenu}
            className="w-8 h-8 text-white"
          />
        }
      </div>
    </nav>
    {
      displayMenu && windowWidth <= 600
        ? <div className="w-full h-screen fixed top-0 left-0 z-40 bg-gray-200 flex items-center justify-center">
          <ul className="w-full max-w-sm flex flex-col items-center gap-4">
            <li className="w-full">
              <Button 
                className="w-full"
                onClick={() => navigateAndClose("/admin/products")}
              >
                Products
              </Button>
            </li>
            <li className="w-full">
              <Button 
                className="w-full"
                onClick={() => navigateAndClose("/admin/new-product")}
              >
                Create a product
              </Button>
            </li>
          </ul>
        </div>
        : null
    }
    <main className="w-full max-w-7xl mx-auto px-4 py-4">
      <Outlet />
    </main>
  </>
}