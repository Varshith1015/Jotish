import { useEffect, useState } from "react";

export default function ListPage(){

    const [employees, setEmployees] = useState([]);
    const [scrollTop, setScrollTop] = useState(0);
    const rowHeight = 40;
    const startIndex = Math.floor(scrollTop / rowHeight);
    const containerHeight = 500;
    const visibleRows = Math.ceil(containerHeight / rowHeight);
    const endIndex = startIndex + visibleRows;


    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const scrollPosition = event.currentTarget.scrollTop;
        setScrollTop(scrollPosition);
        console.log(scrollTop);
        console.log("Start Index:", startIndex);
        console.log("Start:", startIndex);
        console.log("End:", endIndex);
    };



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
        <div style={{ height: "500px", overflowY: "auto" }} onScroll={handleScroll}>
            <h1>List Page</h1>
            <p>Total Employees: {employees.length}</p>
            <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>City</th>
                    <th>Extension</th>
                    <th>StartDate</th>
                    <th>Salary</th>
                    </tr>
                </thead>

                <tbody>
                    {employees.map((employee: any, index: number) => (
                    <tr key={index}>
                        <td>{employee[0]}</td>
                        <td>{employee[1]}</td>
                        <td>{employee[2]}</td>
                        <td>{employee[3]}</td>
                        <td>{employee[4]}</td>
                        <td>{employee[5]}</td>
                    </tr>
                    ))}
                </tbody>
            </table>

            

        </div>
    )
}