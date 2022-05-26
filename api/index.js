import axios from "axios";

export const sharpenImageApi = img =>
    axios.post("https://nft-marketplace-api-v1.herokuapp.com/edit/sharpen", img, {
        headers: {
            "Content-Type": `multipart/form-data`
        }
    });

export const blurImageApi = img =>
    axios.post(
        "https://nft-marketplace-api-v1.herokuapp.com/edit/gaussianblur",
        img, {
            headers: {
                "Content-Type": `multipart/form-data`
            }
        }
    );

export const negativeImageApi = img =>
    axios.post(
        "https://nft-marketplace-api-v1.herokuapp.com/edit/negative",
        img, {
            headers: { "Content-Type": "multipart/form-data" }
        }
    );
export const sepiaImageApi = img =>
    axios.post("https://nft-marketplace-api-v1.herokuapp.com/edit/sepia", img, {
        headers: { "Content-Type": "multipart/form-data" }
    });
export const contrastImageApi = img =>
    axios.post(
        "https://nft-marketplace-api-v1.herokuapp.com/edit/contrast",
        img, {
            headers: { "Content-Type": "multipart/form-data" }
        }
    );
export const grayImageApi = img =>
    axios.post("https://nft-marketplace-api-v1.herokuapp.com/edit/gray", img, {
        headers: { "Content-Type": "multipart/form-data" }
    });
export const denoiseImageApi = img =>
    axios.post("https://nft-marketplace-api-v1.herokuapp.com/edit/denoise", img, {
        headers: { "Content-Type": "multipart/form-data" }
    });

export const resetImageApi = img =>
    axios.post("https://nft-marketplace-api-v1.herokuapp.com/edit/reset", img, {
        headers: { "Content-Type": "multipart/form-data" }
    });