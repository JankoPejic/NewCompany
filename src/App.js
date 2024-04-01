// App.js
import React, { createContext, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Products from "./pages/Products";
import Suppliers from "./pages/Suppliers";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getUserInfo } from "./Api/axios";
import { getToken } from "./helpers/localStorage";
import Navigation from "./sections/Navigation";

export const UserContext = createContext();
const defaultTheme = createTheme();

function App() {
  const [user, setUser] = useState(null);
  const { token } = getToken();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserInfo();
        setUser(userData);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    if (!user && token) {
      fetchUserData();
    }
  }, [user]);

  console.log("userApp :>> ", user);
  return (
    <ThemeProvider theme={defaultTheme}>
      <UserContext.Provider value={{ user, updateUser: setUser }}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Navigation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />
            <Route
              path="/suppliers"
              element={
                <ProtectedRoute>
                  <Suppliers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customers"
              element={
                <ProtectedRoute>
                  <Customers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
