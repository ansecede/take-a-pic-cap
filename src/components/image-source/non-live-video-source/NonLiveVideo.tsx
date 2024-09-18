import { useEffect, useRef } from "react";
import { drawImageOnCanvas } from "src/components/helpers";
import { sendImage } from "src/requests/prediction";

interface Props {
    gotImage: boolean;
    setGotImage?: React.Dispatch<React.SetStateAction<boolean>>;
    toCaptureVideoRef: React.RefObject<HTMLVideoElement>;
    canvasRef: React.RefObject<HTMLCanvasElement>;
}

const URL = "http://localhost:8000/video";
async function getVideoQuantity() {
    const res = await fetch(`${URL}/qty`);
    const data = await res.json();
    const quantity = data.quantity as number;

    return quantity;
}

function NonLiveVideo({
    gotImage,
    // setGotImage,
    toCaptureVideoRef,
    canvasRef,
}: Props) {
    useEffect(() => {
        async function sendImagesLoop() {
            const video = toCaptureVideoRef.current;
            const canvas = canvasRef.current;
            if (!video) throw new Error("Could not render video");
            if (!canvas) throw new Error("Could not render canvas");

            drawImageOnCanvas(canvas, video, 480, 270);
            // little hack to obtain the blob object
            const blob = (await new Promise((resolve) =>
                canvas.toBlob(resolve, "image/jpeg")
            )) as Blob;
            await sendImage(blob, false);
        }
        const interval = setInterval(sendImagesLoop, 200);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const videoIndex = useRef<number>(0);
    const videoQuantity = useRef<number>(0);
    useEffect(() => {
        async function setVideoQuantity() {
            videoQuantity.current = await getVideoQuantity();
        }
        async function setFirstVideo() {
            if (!toCaptureVideoRef.current)
                throw new Error("Something happened with the video");
            toCaptureVideoRef.current.src = `${URL}/${videoIndex.current}`;
        }
        setVideoQuantity();
        setFirstVideo();
    }, []);

    return (
        <>
            <video
                ref={toCaptureVideoRef}
                autoPlay={true}
                id="my-video"
                crossOrigin="anonymous"
                controls
                onEnded={() => {
                    videoIndex.current++;
                    if (videoIndex.current > videoQuantity.current - 1) {
                        videoIndex.current = 0;
                    }
                    if (!toCaptureVideoRef.current)
                        throw new Error("Something happened with the video");
                    toCaptureVideoRef.current.src = `${URL}/${videoIndex.current}`;
                }}
                hidden={!gotImage}
            ></video>
            {gotImage ? <></> : <h1>No videos on server</h1>}
        </>
    );
}

export default NonLiveVideo;
