import { useState } from "react";

export default function LoginPage(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return(
        <div>
            <h1>Login</h1>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={() => alert("Logging in")}>Login</button>

        </div>
    )
}

