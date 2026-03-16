import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

export default function LoginPage(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const authContext = useContext(AuthContext);
    const login = authContext?.login;
    
    const handleLogin = () => {
        if (login) {
            alert("Logging in...");
            login(username, password);
        } else {
            alert("Auth context not available.");
        }
    };

    return(
        <div>
            <h1>Login</h1>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>

        </div>
    )
}

