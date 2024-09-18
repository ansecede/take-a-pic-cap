import { useEffect } from "react";

function useLivePrediction(requestInferenceCallback: () => Promise<void>) {
    useEffect(() => {
        const interval = setInterval(requestInferenceCallback, 1000);

        return () => {
            clearInterval(interval);
        };
    });
}

export default useLivePrediction;
