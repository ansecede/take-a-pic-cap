const API_URL = "http://127.0.0.1:8000/image";
export async function getLatestImage() {
    const res = await fetch(`${API_URL}/latest`);
    const blob = await res.blob();

    const imageUrl = URL.createObjectURL(blob);
    // console.log({ imageUrl, blob });
    return { imageUrl, blob };
}
