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
            .then((response) => response.json())
            .then((data) => {
            const rows = data.TABLE_DATA.data;
            console.log(rows);
            setEmployees(rows);
            })
            .catch((error) => {
            console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div>
            <h1>List Page</h1>
            <p>Total Employees: {employees.length}</p>
        </div>
    )
}