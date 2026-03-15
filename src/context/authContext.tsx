import { createContext, useState } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = (username: string, password: string) => {
  if (username === "testuser" && password === "Test123") {
    setIsAuthenticated(true);
  } else {
    alert("Invalid credentials");
  }
};
  return (
    <AuthContext.Provider value={{ isAuthenticated , login }}>
      {children}
    </AuthContext.Provider>
  );
}