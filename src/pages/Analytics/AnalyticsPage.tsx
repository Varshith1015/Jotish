import { useLocation } from "react-router-dom";



export default function AnalyticsPage() {

    const location = useLocation();
    const image = location.state?.image;
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
    </div>
  );
}

