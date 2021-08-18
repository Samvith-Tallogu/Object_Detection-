status = "";
objects = [];
function preload(){}

function setup() {
    canvas = createCanvas(400, 330);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(400, 330);
    detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = 'Status: Detecting Objects';
}

function modelLoaded() {
    console.log('CocoSSD Loaded!');
    status = true;
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 400, 330);
    if (status !="") {
        r = random(255);
        g = random(255);
        b = random(255);
        detector.detect(video, gotResults);
        for(i = 0; i < objects.length; i++){
            document.getElementById('status').innerHTML = 'Status: Objects detected Successfully!';
            document.getElementById('no_of_objects').innerHTML = "Number of objects detected:" + objects.length;
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label+'  ' + percent + '%', objects[i].x + 12, objects[i].y + 25);
            noFill();
            stroke(r, g, b);
            textSize(24);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
        }
}

