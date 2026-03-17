import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";



export default function AnalyticsPage() {

    const location = useLocation();
    const image = location.state?.image;
    const [employees, setEmployees] = useState<any[]>([]);


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
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setEmployees(data.TABLE_DATA.data); // ✅ FIX
            });
    }, []);

    const citySalaryMap: Record<string, number> = {};

    employees.forEach(emp => {
        const city = emp[2]; // ✅ FIX
        const salary = Number(emp[5].replace(/[$,]/g, "")); // ✅ FIX

        if (!citySalaryMap[city]) {
            citySalaryMap[city] = 0;
        }

        citySalaryMap[city] += salary;
    });

    const chartData = Object.entries(citySalaryMap);

    console.log(chartData);

    const chartWidth = 500;
    const chartHeight = 300;
    const barWidth = 40;

    const maxSalary = Math.max(...chartData.map(([_, value]) => value), 0);

    const getBarHeight = (value: number) => {
        return (value / maxSalary) * chartHeight;
    };


  return (
    <div>
      <h1>Analytics Page</h1>

      {image ? (
        <div>
          <h3>Merged Audit Image</h3>
          <img src={image} alt="Merged" style={{ width: "400px" }} />
        </div>
      ) : (
        <p>No image available</p>
      )}
      <svg width={chartWidth} height={chartHeight} style={{ border: "1px solid black" }}>
            {chartData.map(([city, value], index) => {
                const barHeight = getBarHeight(value);
                const x = index * (barWidth + 20);
                const y = chartHeight - barHeight;

                return (
                    <g key={city}>
                    <rect fill="steelblue"
                        x={x}
                        y={y}
                        width={barWidth}
                        height={barHeight}
                    />

                    {/* City Label */}
                    <text
                        x={x}
                        y={chartHeight + 15}
                        fontSize="10"
                    >
                        {city}
                    </text>
                    </g>
                );
            })}
                
      </svg>
    </div>
  );
}

