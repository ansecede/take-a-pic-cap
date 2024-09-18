import { getLatestImage } from "src/requests/image";
import { ImageSourceRepository } from "./ImageSourceRepository";
import { TopNPrediction } from "..";
import { getQueuedPrediction } from "src/requests/prediction";

export class StreamSource implements ImageSourceRepository {
    private readonly staticImgRef: React.MutableRefObject<HTMLImageElement | null>;
    private readonly setPrediction: React.Dispatch<
        React.SetStateAction<TopNPrediction>
    >;
    constructor(
        imgRef: React.MutableRefObject<HTMLImageElement | null>,
        setPrediction: React.Dispatch<React.SetStateAction<TopNPrediction>>
    ) {
        this.staticImgRef = imgRef;
        this.setPrediction = setPrediction;
    }

    async showImage() {
        const { imageUrl } = await getLatestImage();
        if (!this.staticImgRef.current)
            throw new Error("Could not render static img");
        this.staticImgRef.current.src = imageUrl;
    }

    requestInference = async () => {
        await this.showImage();
        try {
            const predict = await getQueuedPrediction();
            this.setPrediction(predict);
        } catch {
            console.error("GPU server not up");
        }
    };
}
