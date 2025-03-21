import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // Only for signup
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || []; // Get stored users

    if (isLogin) {
      // ✅ LOGIN LOGIC: Check if user exists
      const user = users.find(user => user.email === email && user.password === password);
      if (user) {
        localStorage.setItem("isAuthenticated", "true");  // ✅ Mark as logged in
        alert("Login Successful!");
        setIsAuthenticated(true);
        navigate("/");
      } else {
        alert("Invalid Email or Password!");
      }
    } else {
      // ✅ SIGNUP LOGIC: Store new user
      if (users.some(user => user.email === email)) {
        alert("User already exists! Please login.");
        return;
      }
      const newUser = { email, password, username };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users)); // ✅ Save user data
      alert("Signup Successful! Now login.");
      setIsLogin(true);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Signup"}</h2>
      <form onSubmit={handleAuth}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        {!isLogin && (
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        )}
        <button type="submit" className="btn">Submit</button>
      </form>
      <p onClick={() => setIsLogin(!isLogin)} className="toggle-text">
        {isLogin ? "New user? Signup" : "Already have an account? Login"}
      </p>
    </div>
  );
};

export default Auth;
