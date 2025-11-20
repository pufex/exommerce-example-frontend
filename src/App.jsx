import { Navigate, Route, Routes } from "react-router"
import Navbar from "./Layout/Navbar"
import UnloggedRoute from "./auth/components/UnloggedRoute"
import AdminRoute from "./auth/components/AdminRoute"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import Home from "./pages/Home"
import Products from "./pages/admin/Products"
import NewProductPage from "./pages/admin/NewProductPage"
import AdminNavbar from "./layout/AdminNavbar"
import EditProductPage from "./pages/admin/EditProductPage"
import CartPage from "./pages/CartPage"
import ProductsPage from "./pages/ProductsPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Navigate to="/home" replace={true} />}/>        

        <Route path="home" element={<Home />} />

        <Route path="cart" element={<CartPage />}/>

        <Route path="products">
            <Route index element={<ProductsPage />}/>
        </Route>

        <Route path="/auth" element={<UnloggedRoute />}>
          <Route path="login" element={<LoginPage />}/>
          <Route path="register" element={<RegisterPage />}/>
        </Route>
      </Route>

      <Route path="/admin" element={<AdminRoute />}>
        <Route element={<AdminNavbar />}>
          <Route path="products" element={<Products />}/>
          <Route path="products/edit/:id" element={<EditProductPage />}/>
          <Route path="new-product" element={<NewProductPage />}/>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
