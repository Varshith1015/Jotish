import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage.tsx";
import ListPage from "./pages/List/ListPage.tsx";
import ProtectedRoute from "./components/protectRoute.tsx";


export default function App(){
  return (
    <Routes>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/list" element={<ProtectedRoute><ListPage /></ProtectedRoute>} />
      
      
    </Routes>
  )
};