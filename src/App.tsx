// import { useRef } from "react";
import "./App.css";
import PredictionBox from "./components/prediction";
// import ScaleImage from "./components/ScaleImage";
import Title from "./components/title";
import useAppSetup from "./components/useAppSetup";
import Grid from "./layout/grid";
import "./components/Components.css";
import ImageSourceTabs from "./components/image-source/tabs";
import Webcam from "./components/image-source/webcam-source";
import ImageStream from "./components/image-source/stream-source";
import ImageSource from "./components/image-source";
import { ImageSourceFactory } from "./modules/image-source/ImageSourceFactory";
import NonLiveVideo from "./components/image-source/non-live-video-source";

const imageSourceFactory = new ImageSourceFactory();

function App() {
    const {
        toCaptureVideoRef,
        canvasRef,
        prediction,
        setPrediction,
        gotImage,
        setGotImage,
        staticImgRef,
    } = useAppSetup();
    return (
        <>
            <Grid
                title={<Title title="Take a Pic/Cap"></Title>}
                camera={<>This was camera</>}
                leftContiner={
                    <ImageSourceTabs
                        liveStreamSrc={
                            <ImageSource
                                gotImage={gotImage}
                                setPrediction={setPrediction}
                                imageSourceRepo={imageSourceFactory.createImageSource(
                                    {
                                        type: "stream",
                                        payload: {
                                            imgRef: staticImgRef,
                                            setPrediction,
                                        },
                                    }
                                )}
                            >
                                <ImageStream
                                    gotImage={gotImage}
                                    setGotImage={setGotImage}
                                />
                            </ImageSource>
                        }
                        webcamSrc={
                            <ImageSource
                                gotImage={gotImage}
                                setPrediction={setPrediction}
                                imageSourceRepo={imageSourceFactory.createImageSource(
                                    {
                                        type: "webcam",
                                        payload: {
                                            videoRef: toCaptureVideoRef,
                                            canvasRef,
                                            imgRef: staticImgRef,
                                            setPrediction,
                                        },
                                    }
                                )}
                            >
                                <Webcam
                                    gotImage={gotImage}
                                    setGotImage={setGotImage}
                                    toCaptureVideoRef={toCaptureVideoRef}
                                    canvasRef={canvasRef}
                                />
                            </ImageSource>
                        }
                        nonLiveVideoSrc={
                            <ImageSource
                                gotImage={gotImage}
                                setPrediction={setPrediction}
                                imageSourceRepo={imageSourceFactory.createImageSource(
                                    {
                                        type: "webcam",
                                        payload: {
                                            videoRef: toCaptureVideoRef,
                                            canvasRef,
                                            imgRef: staticImgRef,
                                            setPrediction,
                                        },
                                    }
                                )}
                            >
                                <NonLiveVideo
                                    gotImage={gotImage}
                                    toCaptureVideoRef={toCaptureVideoRef}
                                    canvasRef={canvasRef}
                                />
                            </ImageSource>
                        }
                    />
                }
                rightContainer={
                    <PredictionBox
                        prediction={prediction}
                        canvasRef={canvasRef}
                        staticImgRef={staticImgRef}
                    ></PredictionBox>
                }
                buttons={<></>}
            ></Grid>
            {/* <h1>Display Webcam Stream</h1>
        <div id="container">
          <video ref={videoRef} autoPlay={true} id="my-video"></video>
        </div>
        <button onClick={setupCamera}>click!</button>
        <button onClick={endStream}>End Stream!</button> */}
        </>
    );
}

export default App;
