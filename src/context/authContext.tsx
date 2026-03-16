import { createContext, useState ,useEffect} from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (username: string, password: string) => {
        console.log("Login clicked", username, password);
        if (username === "testuser" && password === "Test123") {
            console.log("Login success");
            setIsAuthenticated(true);
            localStorage.setItem("isAuthenticated", "true");
        } else {
            console.log("Invalid credentials");
            alert("Invalid credentials");
        }
    };

    useEffect(() => {
        const storedAuth = localStorage.getItem("isAuthenticated");
        if (storedAuth === "true") {
            setIsAuthenticated(true);
        }
    }, []);

    const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    };
  

    return (
        <AuthContext.Provider value={{ isAuthenticated , login, logout }}>
        {children}
        </AuthContext.Provider>
    );
}