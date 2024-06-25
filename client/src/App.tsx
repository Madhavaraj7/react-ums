
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/user/Home";
import About from "./pages/user/About";
import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";
import Profile from "./pages/user/Profile";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
