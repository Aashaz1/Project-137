status = "";
input = "";
objects = [];

function setup(){
    canvas = createCanvas(500, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(500, 400);
}

function startRecognition(){
    video.play();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = `Detecting Objects`;
    input = document.getElementById("object").value;
}

function modelLoaded(){
    console.log("Model is Loaded");
    status = true;
}

function gotResults(error, results){
    if(error){
        console.log(error);
    } else {
        console.log(results);
        objects = results;
     }
}

function draw(){
    image(video, 0,0, 500, 400);

    if(status != ""){
        objectDetector.detect(video, gotResults);
        for(i = 0; i < objects.length; i++){
            console.log(objects.length);
            console.log(input);
            if (objects[i].label == input) {
                video.stop();
                objectDetector.detect(gotResults);
             document.getElementById("detected").innerHTML = `${input} Found`;
         }
         else {
             document.getElementById("detected").innerHTML = `${input} not Found`;
         }
        }
    }
}