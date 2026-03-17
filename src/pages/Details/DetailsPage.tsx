import { useEffect, useRef } from "react";

export default function DetailsPage(){

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true
                });

                streamRef.current = stream;

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Error accessing camera:", error);
            }
        };

        startCamera();

        // ✅ CLEANUP
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);


   const handleCapture = () => {
        if (!videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (video.videoWidth === 0 || video.videoHeight === 0) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // ✅ STOP CAMERA AFTER CAPTURE
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }
    };


    


    return(
        <div>
            <h1>Employee Details</h1>
            <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{ width: "400px", border: "1px solid black" }}
            />
            <button onClick={handleCapture}>
                Capture Photo
            </button>

            <canvas
                ref={canvasRef}
                style={{ marginTop: "20px", border: "1px solid black" }}
            />


        </div>
    )
};

