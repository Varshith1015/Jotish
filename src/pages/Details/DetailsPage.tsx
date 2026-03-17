import { useEffect, useRef } from "react";


export default function DetailsPage(){
    
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
    const startCamera = async () => {
        try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true
        });

        if (videoRef.current) {
            videoRef.current.srcObject = stream;
        }
        } catch (error) {
        console.error("Error accessing camera:", error);
        }
    };

    startCamera();
    }, []);

    return(
        <div>
            <h1>Employee Details</h1>
            <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{ width: "400px", border: "1px solid black" }}
            />
        </div>
    )
};

