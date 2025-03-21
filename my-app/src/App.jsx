import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/home";
import ProductDetails from "./pages/ProductDetails";
import Auth from "./pages/Auth";
import Navbar from "./components/Navbar";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // ✅ Check if user is logged in
    const loggedIn = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(loggedIn === "true");
  }, []);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        {/* ✅ Protect Home & Product Pages */}
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/auth" />} />
        <Route path="/product/:id" element={isAuthenticated ? <ProductDetails /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
    </Router>
  );
};

export default App;
