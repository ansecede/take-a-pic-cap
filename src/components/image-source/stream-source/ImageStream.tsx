import { useEffect, useRef } from "react";

interface Props {
    gotImage: boolean;
    setGotImage: React.Dispatch<React.SetStateAction<boolean>>;
}
const errorMsg = "Streaming server not available";

function ImageStream({ gotImage, setGotImage }: Props) {
    const pseudoVideoRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        try {
            const ws = new WebSocket("ws://127.0.0.1:8000/webcam");
            ws.onopen = () => {
                ws.send("Connected");
                console.log("Connected");
            };
            ws.onmessage = (event) => {
                let imgData = event.data;
                const video = pseudoVideoRef.current;
                if (!video) throw new Error("Could not render video");
                if (video.src) {
                    URL.revokeObjectURL(video.src);
                }
                setGotImage(true);
                video.src = `data:image/png;base64,${imgData}`;
                imgData = null;
            };

            return () => {
                console.log("Closing connection", ws.readyState);
                ws.close();
            };
        } catch {
            console.log(errorMsg);
        }
    }, []);

    return (
        <>
            <img
                ref={pseudoVideoRef}
                alt="Webcam Stream"
                id="my-video2"
                // hidden={!gotImage}
            />
            {gotImage ? <></> : <h1>{errorMsg}</h1>}
        </>
    );
}

export default ImageStream;
