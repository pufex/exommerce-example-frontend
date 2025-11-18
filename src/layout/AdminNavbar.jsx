import { Link, Outlet, useNavigate } from "react-router";

export default function AdminNavbar (){
    const navigate = useNavigate()
    return <>
        <div className="w-full h-20"/>
        <nav className="fixed top-0 left-0 w-full h-20 bg-red-600 border-b-2 border-b-red-800">
            <div className="w-full max-w-7xl h-full mx-auto px-4 flex justify-between items-center">
                <h1 
                    className="text-3xl text-white font-bold cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    ADMIN
                </h1>
                <ul className="flex items-center gap-4">
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
            </div>
        </nav>
        <main className="w-full max-w-7xl mx-auto">
            <Outlet />
        </main>
    </>
}