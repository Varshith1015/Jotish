import { useEffect, useState } from "react";

export default function ListPage(){

    const [employees, setEmployees] = useState([]);
    const [scrollTop, setScrollTop] = useState(0);
    const rowHeight = 40;
    const buffer = 5;
    const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - buffer);
    const containerHeight = 500;
    const visibleRows = Math.ceil(containerHeight / rowHeight);
    const endIndex = startIndex + visibleRows + buffer * 2;
    const visibleEmployees = employees.slice(startIndex, endIndex);
    const totalHeight = employees.length * rowHeight;
    const offsetY = startIndex * rowHeight;
    

    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const scrollPosition = event.currentTarget.scrollTop;
        setScrollTop(scrollPosition);
        console.log("Scroll:", scrollPosition);
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

            {/* SCROLL CONTAINER */}
            <div style={{ height: "500px", overflowY: "auto" }} onScroll={handleScroll}>
               
                <div style={{ height: totalHeight, position: "relative" }}>

                    <div style={{ transform: `translateY(${offsetY}px)` }}>
                    
                    {visibleEmployees.map((employee, index) => (
                        <div key={index} style={{ height: rowHeight }}>
                        {employee[0]}
                        </div>
                    ))}

                    </div>

                </div>
            </div>

        </div>
    )
}