import { drawImageOnCanvas } from "src/components/helpers";
import { ImageSourceRepository } from "./ImageSourceRepository";
import { getQueuedPrediction } from "src/requests/prediction";
import { TopNPrediction } from "..";

export class WebcamSource implements ImageSourceRepository {
    private readonly videoRef: React.MutableRefObject<HTMLVideoElement | null>;
    private readonly canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
    private readonly staticImgRef: React.MutableRefObject<HTMLImageElement | null>;
    private readonly setPrediction: React.Dispatch<
        React.SetStateAction<TopNPrediction>
    >;

    constructor(
        videoRef: React.MutableRefObject<HTMLVideoElement | null>,
        canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
        imgRef: React.MutableRefObject<HTMLImageElement | null>,
        setPrediction: React.Dispatch<React.SetStateAction<TopNPrediction>>
    ) {
        this.videoRef = videoRef;
        this.canvasRef = canvasRef;
        this.staticImgRef = imgRef;
        this.setPrediction = setPrediction;
    }

    showImage() {
        const canvas = this.canvasRef.current;
        const photo = this.staticImgRef.current;
        const video = this.videoRef.current;
        if (!photo) throw new Error("Could not render img");
        if (!canvas) throw new Error("Could not render canvas");
        if (!video) throw new Error("Could not render video");

        drawImageOnCanvas(canvas, video, 600, 450);
        const data = canvas.toDataURL("image/jpeg");
        photo.src = data;
    }

    requestInference = async () => {
        this.showImage();

        try {
            const predict = await getQueuedPrediction();
            this.setPrediction(predict);
        } catch {
            console.error("GPU server not up");
        }
    };
}
