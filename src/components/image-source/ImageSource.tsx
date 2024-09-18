import React from "react";
import { TopNPrediction } from "src/modules";
import { ImageSourceRepository } from "src/modules/image-source/ImageSourceRepository";
import "./image-source.css";
// import useLivePrediction from "../useLivePrediction";

interface Props extends React.PropsWithChildren {
    gotImage: boolean;
    imageSourceRepo: ImageSourceRepository;
    setPrediction: React.Dispatch<React.SetStateAction<TopNPrediction>>;
}

function VideoSource({ children, gotImage, imageSourceRepo }: Props) {
    // useLivePrediction(imageSourceRepo.requestInference);
    return (
        <>
            <div className="stream">
                {/* {gotImage ? <img ref={imgRef}></img> : <h3>Cargando imagen...</h3>} */}
                {children}
            </div>
            <div className="actions">
                <button
                    disabled={!gotImage}
                    // onClick={takeMultiplePictures}
                    onClick={imageSourceRepo.requestInference}
                    className="button-31"
                    role="button"
                >
                    {/* 📷 */} Inferir
                </button>
            </div>
        </>
    );
}

export default VideoSource;
