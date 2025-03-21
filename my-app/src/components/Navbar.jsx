import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");  // ✅ Remove auth state
    setIsAuthenticated(false);
    navigate("/auth");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Shop</Link>
      {isAuthenticated ? (
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/auth" className="login-btn">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
