import { useEffect } from "react";
import { drawImageOnCanvas } from "src/components/helpers";
import { sendImage } from "src/requests/prediction";

interface Props {
    gotImage: boolean;
    setGotImage: React.Dispatch<React.SetStateAction<boolean>>;
    toCaptureVideoRef: React.RefObject<HTMLVideoElement>;
    canvasRef: React.RefObject<HTMLCanvasElement>;
}

function Webcam({
    gotImage,
    setGotImage,
    toCaptureVideoRef,
    canvasRef,
}: Props) {
    useEffect(() => {
        async function setupCamera() {
            try {
                const media = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: "environment" },
                });

                console.log("getUserMedia", media);
                if (media && toCaptureVideoRef.current) {
                    toCaptureVideoRef.current.srcObject = media;
                    setGotImage(true);
                }
            } catch {
                console.error("Upps, it seems device has no video device.");
            }

            try {
                const enumMedia =
                    await navigator.mediaDevices.enumerateDevices();
                console.log(enumMedia);
            } catch {
                console.error("Upps, it seems device has no devices.");
            }
        }

        async function endStream() {
            if (toCaptureVideoRef.current) {
                toCaptureVideoRef.current.srcObject = null;
            }
        }

        setupCamera();
        return () => {
            endStream();
        };
    }, [toCaptureVideoRef, setGotImage]);

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
    return (
        <>
            <video
                ref={toCaptureVideoRef}
                autoPlay={true}
                id="my-video"
                hidden={!gotImage}
            ></video>
            {/* {gotImage ? (
                <></>
            ) : (
                <h1>
                    It seems you don't have a camera, or the app doesn't have
                    the permissions to access it
                </h1>
            )} */}
        </>
    );
}

export default Webcam;
