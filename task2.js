var imageCapture;

navigator.mediaDevices.getUserMedia({ video: true })  // get a media input with video from the user, producing a MediaStream
  .then(mediaStream => {
    const track = mediaStream.getVideoTracks()[0];  // assign the video track from MediaStream to the constant 'track'
    imageCapture = new ImageCapture(track);  // create an object that can capture still images from track
  })
  .catch(error => console.log(error));

let p = document.getElementById("data");  // <p id="data"></p>
let counter = document.getElementById("facesAnalysed");  // <p id="facesAnalysed">Number of faces analysed: 5</p>
let takePhotoButton = document.getElementById("takePhoto");  // <button id="takePhoto">Take a photo</button>
let number = 5;
let averageAge = 20;
let tempAge;
let genderM = 2;
let genderF = 3;
let averageGender = "female";
let smile0 = 4;
let smile1 = 1;
let averageSmile = "no";
let emotionsAverage = [0, 0, 0, 0, 0, 0.996, 0.004, 0];

takePhotoButton.onclick = takePhoto;  // <button id="takePhoto" onclick="takePhoto()">Take a photo</button>

function takePhoto() {
  imageCapture.takePhoto().then(function (blob) {  // capture an image from track
    console.log('Took photo:', blob);
    ImageAPI.analyseFacesBlob(  // image is analysed by API
      blob,
      function (data) {
        console.log(data);
        // update number of faces analysed
        number += data.length;
        // update average age
        tempAge = 0;
        for (let j = 0; j < data.length; j++) {
          tempAge += data[j].faceAttributes.age;
        };
        averageAge = (averageAge * (number - data.length) + tempAge) / number;
        console.log(averageAge);
        // update average emotions
        let item = data[0];
        let emotionsAttr = [
          item.faceAttributes.emotion.anger,
          item.faceAttributes.emotion.contempt,
          item.faceAttributes.emotion.disgust,
          item.faceAttributes.emotion.fear,
          item.faceAttributes.emotion.happiness,
          item.faceAttributes.emotion.neutral,
          item.faceAttributes.emotion.sadness,
          item.faceAttributes.emotion.surprise,
        ];
        for (let j = 0; j < 8; j++) {
          let temporary = 0;
          for (item in data) {
            temporary += emotionsAttr[j];
          };
          emotionsAverage[j] = (emotionsAverage[j] * (number - data.length) + temporary) / number;
        };
        console.log(JSON.stringify(emotionsAverage));
        let i = 0;
        // find the more common value of an attribute
        function findAvg(attribute, case1, var1, var2, result1, result2, varAvg) {
          for (i = 0; i < data.length; i++) {
            if (attribute = case1) {
              var1 += 1;
            } else {
              var2 += 1;
            };
          };
          i = 0;
          if (var1 > var2) {
            varAvg = result1;
          } else {
            varAvg = result2;
          };
        };
        // update average gender
        findAvg(data[i].faceAttributes.gender, "male", genderM, genderF, "male", "female", averageGender);
        console.log(averageGender);
        // update average smile
        findAvg(data[i].faceAttributes.smile, 0, smile0, smile1, "no", "yes", averageSmile);
        console.log(averageSmile);
        // display updated data in document
        counter.innerHTML = `Number of faces analysed: ${number}`;
        p.innerHTML = `${averageAge.toFixed(3)}<br>${averageGender}<br>${averageSmile}<br><br><br><br>`;
        for (let j = 0; j < emotionsAverage.length; j++) {
          p.innerHTML += emotionsAverage[j].toFixed(3) + "<br>";
        };
      }
    );
    let img = document.querySelector('img');  // <img class="photo">
    img.src = URL.createObjectURL(blob);  // display image captured from track
  }).catch(function (error) {
    console.log('takePhoto() error: ', error);
  });
};