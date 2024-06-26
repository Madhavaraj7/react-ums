import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/user/Home";
import About from "./pages/user/About";
import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";
import Profile from "./pages/user/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRouter";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/adminDashboad";
import AdminPrivateRoute from "./components/ProtectedAdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route element={<AdminPrivateRoute />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
