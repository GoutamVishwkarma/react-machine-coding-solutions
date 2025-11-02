import React, { useEffect, useState, useContext } from "react";
import {
  BrowserRouter as RoutesWrapper,
  Routes,
  Route,
  Outlet,
  Navigate,
  useNavigate,
} from "react-router-dom";

const AuthContext = React.createContext();
const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => setLoggedIn(!!localStorage.getItem("login")), []);

  const login = () => {
    localStorage.setItem("login", "true");
    setLoggedIn(true);
  };
  const logout = () => {
    localStorage.removeItem("login");
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", marginTop: "40vh" }}>
      <h3>Login Page</h3>
      <button
        onClick={() => {
          login();
          navigate("/dashboard");
        }}
        style={{ padding: "6px 12px" }}
      >
        Login
      </button>
    </div>
  );
}

function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", marginTop: "40vh" }}>
      <h3>Dashboard</h3>
      <button
        onClick={() => {
          logout();
          navigate("/login");
        }}
        style={{ padding: "6px 12px" }}
      >
        Logout
      </button>
    </div>
  );
}

function AuthCheck() {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <RoutesWrapper>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<AuthCheck />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </RoutesWrapper>
  );
}
