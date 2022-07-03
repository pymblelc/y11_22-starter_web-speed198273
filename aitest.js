let image = document.getElementById("photo");
let button = document.getElementById("btnAnalyse");
let results = document.getElementById("text");
let imageURL = image.src;
let form = document.querySelector("form");
let p = document.getElementById("results");

var faces = [];

results.innerHTML = imageURL;

button.addEventListener("click", function () {
    ImageAPI.analyseFaces(imageURL, function (data) {
        console.log(data);
        if (faces = []) {
            for (let i = 0; i < data.length; i++) {
                faces.push({
                    "blur": data[i].faceAttributes.blur,
                    "exposure": data[i].faceAttributes.exposure,
                    "noise": data[i].faceAttributes.noise,
                });
            };
        };
        console.log(faces);
        let blur = document.getElementById("r1");
        let exposure = document.getElementById("r2");
        let noise = document.getElementById("r3");
        let options = [blur, exposure, noise];
        let attributes = ["blur", "exposure", "noise"];
        let currentAttribute;
        for (var i = 0; i < options.length; i++) {
            currentAttribute = attributes[i];
            console.log(currentAttribute);
            if (options[i].checked) {
                for (let j = 0; j < faces.length; j++) {
                    let facesList = [faces[j].blur, faces[j].exposure, faces[j].noise];
                    console.log(JSON.stringify(facesList[i]));
                    p.innerHTML += "<br>"
                    p.innerHTML += `Person ${j + 1}: ${JSON.stringify(facesList[i])}`;
                };
            };
        };
    });
});