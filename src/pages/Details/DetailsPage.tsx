import { useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DetailsPage(){

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [finalImage, setFinalImage] = useState<string | null>(null);
    const navigate = useNavigate();



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

    const getMousePos = (canvas: HTMLCanvasElement, event: React.MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) return;

        const { x, y } = getMousePos(canvas, e);

        context.beginPath();
        context.moveTo(x, y);

        setIsDrawing(true);
    };


    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDrawing || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) return;

        const { x, y } = getMousePos(canvas, e);

        context.lineTo(x, y);
        context.stroke();
    };


    const handleMouseUp = () => {
        setIsDrawing(false);
    };


    const handleSaveImage = () => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const imageData = canvas.toDataURL("image/png");

        setFinalImage(imageData);

        // 🔥 navigate to analytics with image
        navigate("/analytics", {
            state: { image: imageData }
        });
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
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            />

            <button onClick={handleSaveImage}>
                Save Image
            </button>


            {finalImage && (
                    <div style={{ marginTop: "20px" }}>
                        <h3>Final Merged Image</h3>
                        <img src={finalImage} alt="Merged" style={{ width: "400px" }} />
                    </div>
            )}



        </div>
    )
};

