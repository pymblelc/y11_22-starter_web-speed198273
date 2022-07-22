const PIXABAY_URL = "https://pixabay.com/api/?key=9054397-010427f0eb2adc019d523491f";
const ACS_URL = "https://sddcognitiveservices.cognitiveservices.azure.com";
const ACS_KEY = "6cdde304144f4e21ac9495a8847dd44e";

const ImageAPI = {
    async searchPhotos(query, callback) {
        const url = `${PIXABAY_URL}&q=${encodeURIComponent(query)}&image_type=photo&per_page=10&safesearch=true`;
        const response = await fetch(url);
        const data = await response.json();
        if (callback) {
            callback(data);
        };

        return data;
    },

    async analyseImage(imageUrl, callback) {
        const url = `${ACS_URL}/vision/v3.2/analyze?visualFeatures=Categories,Description&details=Landmarks`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Ocp-Apim-Subscription-Key": ACS_KEY
            },
            body: JSON.stringify({
                url: imageUrl
            }),
        });
        const data = await response.json();
        if (callback) {
            callback(data);
        }

        return data;
    },

    async analyseFaces(imageUrl, callback) {
        const url = `${ACS_URL}/face/v1.0/detect?returnFaceAttributes=blur,exposure,noise,age,gender,facialhair,glasses,hair,makeup,accessories,occlusion,headpose,emotion,smile&recognitionModel=recognition_04&returnRecognitionModel=false&detectionModel=detection_01&faceIdTimeToLive=86400`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Ocp-Apim-Subscription-Key": ACS_KEY
            },
            body: JSON.stringify({
                url: imageUrl
            }),
        });
        const data = await response.json();
        if (callback) {
            callback(data);
        }

        return data;
    },
};

globalThis.ImageAPI = ImageAPI;