import { Fragment } from "react";
import { TopNPrediction } from "../../modules";
import "./prediction.css";
import BagType from "./bag-type";

interface Props {
    prediction: TopNPrediction;
    canvasRef: React.RefObject<HTMLCanvasElement>;
    staticImgRef: React.MutableRefObject<HTMLImageElement | null>;
}

function PredictionBox({ prediction, canvasRef, staticImgRef }: Props) {
    return (
        <div className="prediction">
            <div className="prediction-static-img">
                <canvas ref={canvasRef}></canvas>
                <img ref={staticImgRef}></img>
            </div>
            <div className="prediction-box">
                <h1 className="prediction-title">Top predicciones:</h1>
                <div className="prediction-separator"></div>
                <div className="prediction-topn">
                    {prediction.enoughConfidence ? (
                        prediction.topN ? (
                            prediction.topN.map((item, index) => {
                                const roundedConfidence = (
                                    Math.round(item.confidence * 1000) / 1000
                                ).toFixed(3);
                                return (
                                    <Fragment key={item.skuId}>
                                        <p>{`${index + 1}) ${
                                            item.desc
                                        } - ${roundedConfidence}`}</p>
                                        <br />
                                    </Fragment>
                                );
                            })
                        ) : (
                            <p></p>
                        )
                    ) : (
                        <p>
                            Producto no reconocido. Si esta en funda, pruebe
                            enseñando a la camara el producto sin funda. Si esto
                            falla pedir ayuda a un colaborador de la tienda.
                        </p>
                    )}
                </div>
                <div className="prediction-bag_indicator">
                    <div className="prediction-bag_indicator-item">
                        <BagType
                            bagType={prediction.bagType}
                            bagTypeConfidence={prediction.bagTypeConfidence}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PredictionBox;
