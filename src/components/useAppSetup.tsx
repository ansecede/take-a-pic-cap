import { useRef, useState } from "react";
import { TopNPrediction } from "../modules";

function useAppSetup() {
    const toCaptureVideoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // const imgRef = useRef<HTMLImageElement>(null);
    const staticImgRef = useRef<HTMLImageElement | null>(null);
    // const intervalRef = useRef<number | null>(null);

    // const [imgUrl, setImgUrl] = useState("");
    const [prediction, setPrediction] = useState<TopNPrediction>({
        topN: null,
        enoughConfidence: true,
        bagType: "unknown",
        bagTypeConfidence: 0,
    });
    // const [prediction, setPrediction] = useState<TopNPrediction>({
    //     topN: [
    //         { desc: "TORONJA POR UNIDAD", skuId: "1", confidence: 90 },
    //         { desc: "NARANJILLA POR KILO", skuId: "1", confidence: 5 },
    //         { desc: "MANZANILLA POR ATADO", skuId: "1", confidence: 5 },
    //     ],
    //     confidence: true,
    //     type: "unknown",
    // });
    const [gotImage, setGotImage] = useState(true);

    return {
        toCaptureVideoRef,
        canvasRef,
        // imgRef,
        staticImgRef,
        // intervalRef,
        // imgUrl,
        // setImgUrl,
        prediction,
        setPrediction,
        gotImage,
        setGotImage,
    };
}

export default useAppSetup;
