import {
    TopNPrediction,
    isBagFlag,
    mapApiJsonToPredictedItem,
} from "src/modules";

const API_URL = "http://127.0.0.1:8000";

export async function getQueuedPrediction() {
    const url = `${API_URL}/inference_by_button`;

    const res = await fetch(url);
    const prediction = await res.json();
    const topN = mapApiJsonToPredictedItem(prediction.top3_description);
    const topNPrediction: TopNPrediction = {
        topN,
        enoughConfidence: prediction.confidence,
        bagType: isBagFlag(prediction.tipo) ? prediction.tipo : "unknown",
        bagTypeConfidence: prediction.bin_probability,
    };
    console.log("llega", { prediction });
    console.log("entra a la app", { topNPrediction });
    return topNPrediction;
}

export async function sendImage(data: Blob | null, hasFisheye: boolean) {
    if (!data) throw new Error("Could not convert image to blob");
    const url = `${API_URL}/send_images`;

    const form = new FormData();
    form.append("data", data);
    form.append("fisheye", String(hasFisheye));

    const res = await fetch(url, { method: "POST", body: form });
    const prediction = await res.json();

    return prediction;
}
