import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import DesignedLogin from "./components/DesignedLogin";
import DisgnedRegister from "./components/DisgnedRegister";
import Main from "./components/Main";
import Navbar from "./components/Navbar";

function App() {
  return (
          <UserAuthContextProvider>
            <Navbar/>
            <Routes>
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Main />} />
              <Route path="/signup" element={<DisgnedRegister />} />
            </Routes>
          </UserAuthContextProvider>

  );
}

export default App;
