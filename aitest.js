console.log("Hello world")

let image = document.getElementById("photo");
let button = document.getElementById("btnAnalyse");
let results = document.getElementById("text");
let imageURL = image.src;

results.innerHTML = imageURL;

button.addEventListener("click", function () {
    ImageAPI.analyseFaces(imageURL, function (data) {
        console.log("Age is " + data[0].faceAttributes.age);
        for (let i = 0; i < data.length; i++) {
            let emotion = data[i].faceAttributes.emotion;
            let facialHair = data[i].faceAttributes.facialHair;
            let makeup = data[i].faceAttributes.makeup;
            let occlusion = data[i].faceAttributes.occlusion;
            let headpose = data[i].faceAttributes.headPose;
            console.log("Person " + i);
            console.log("Blur: " + data[i].faceAttributes.blur.value + ", " +
            "Exposure: " + data[i].faceAttributes.exposure.value + ", " +
            "Noise: " + data[i].faceAttributes.noise.value + ", " +
            "Age: " + data[i].faceAttributes.age + ", " +
            "Gender: " + data[i].faceAttributes.gender + ", " +
            "Glasses: " + data[i].faceAttributes.glasses + ", " +
            "Smile: " + data[i].faceAttributes.smile);
            console.log("Moustache: " + facialHair.moustache + ", " +
            "Beard: " + facialHair.beard + ", " +
            "Sideburns: " + facialHair.sideburns);
            console.log("Eye makeup: " + makeup.eyeMakeup + ", " +
            "Lip makeup: " + makeup.lipMakeup);
            console.log("Forehead occluded: " + occlusion.foreheadOccluded + ", " +
            "Eye occluded: " + occlusion.eyeOccluded + ", " +
            "Mouth occluded: " + occlusion.mouthOccluded);
            console.log("Headpose - pitch: " + headpose.pitch + ", " +
            "Headpose - roll: " + headpose.roll + ", " +
            "Headpose - yaw: " + headpose.yaw);
            console.log("Anger: " + emotion.anger + ", " +
            "Contempt: " + emotion.contempt + ", " +
            "Fear: " + emotion.fear + ", " +
            "Disgust: " + emotion.disgust + ", " +
            "Happiness: " + emotion.happiness + ", " +
            "Neutral: " + emotion.neutral + ", " +
            "Sadness: " + emotion.sadness + ", " +
            "Surprise: " + emotion.surprise);
            console.log("Hair: " + JSON.stringify(data[i].faceAttributes.hair));
            // accessories - doesn't return anything
        }
    });
});