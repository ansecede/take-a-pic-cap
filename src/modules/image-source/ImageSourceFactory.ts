import { WebcamSource } from "./WebcamSource";
import { TopNPrediction } from "src/modules";
import { StreamSource } from "./StreamSource";

type Source =
  | {
      type: "webcam";
      payload: {
        videoRef: React.MutableRefObject<HTMLVideoElement | null>;
        canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
        imgRef: React.MutableRefObject<HTMLImageElement | null>;
        setPrediction: React.Dispatch<React.SetStateAction<TopNPrediction>>;
      };
    }
  | {
      type: "stream";
      payload: {
        imgRef: React.MutableRefObject<HTMLImageElement | null>;
        setPrediction: React.Dispatch<React.SetStateAction<TopNPrediction>>;
      };
    };

// type Source = keyof typeof sources;

export class ImageSourceFactory {
  createImageSource(source: Source) {
    switch (source.type) {
      case "webcam": {
        const { videoRef, canvasRef, imgRef, setPrediction } = source.payload;
        return new WebcamSource(videoRef, canvasRef, imgRef, setPrediction);
      }
      case "stream": {
        const { imgRef, setPrediction } = source.payload;
        return new StreamSource(imgRef, setPrediction);
      }
    }
  }
}
