import { Navigate, Route, Routes } from "react-router"
import Navbar from "./Layout/Navbar"
import UnloggedRoute from "./auth/components/UnloggedRoute"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import Home from "./pages/Home"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Navigate to="/home" replace={true} />}/>        

        <Route path="home" element={<Home />} />

        <Route path="/auth" element={<UnloggedRoute />}>
          <Route path="login" element={<LoginPage />}/>
          <Route path="register" element={<RegisterPage />}/>
        </Route>

      </Route>
    </Routes>
  )
}

export default App
