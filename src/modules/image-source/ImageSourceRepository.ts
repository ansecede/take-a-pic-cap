export interface ImageSourceRepository {
    requestInference: () => Promise<void>;
    showImage: () => void | Promise<void>;
}
