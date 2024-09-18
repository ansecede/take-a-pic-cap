export function drawImageOnCanvas(
    canvas: HTMLCanvasElement,
    video: HTMLVideoElement,
    w: number,
    h: number
) {
    canvas.width = w;
    canvas.height = h;
    canvas
        .getContext("2d")
        ?.drawImage(video, 0, 0, canvas.width, canvas.height);
}

export type ObjectValues<T> = T[keyof T];
