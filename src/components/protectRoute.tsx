import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";


export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const authContext = useContext(AuthContext);
    const isAuthenticated = authContext?.isAuthenticated;

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
}