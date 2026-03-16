import { useEffect, useState } from "react";

export default function ListPage(){

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetch("https://backend.jotish.in/backend_dev/gettabledata.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: "test",
            password: "123456"
        })
        })
        console.log(employees);        
    }, []);

    return (
        <div>
            <h1>List Page</h1>
        </div>
    )
}