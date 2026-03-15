import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage.tsx";

export default function App(){
  return (
    <Routes>
      
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
};