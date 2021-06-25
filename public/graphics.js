let xspacing = 20;
let w;
let theta = 0.0;
let amplitude = 10.0;
let period = 500.0;
let dx;
let yvalues;
let bpm = 72;
let pastTime = 0;

function showBPM() {
    push();
    textAlign(CENTER, TOP);
    textFont(font);
    textSize(64);
    strokeWeight(1);
    stroke(255);
    fill(255);
    text('BPM : ', ((width/2) * -1) + 200, height/2 - 64, width);
    text('EEG : ', ((width/2) * -1) + 182, height/2 + 100, width);
    let currentTime = millis();
    // console.log('calculating');
    if (currentTime - pastTime >= (60000/bpm)) {
        // console.log('drawing');
        text(bpm.toString(), ((width/2) * -1) + 350, height/2 - 64, width);
        pastTime = currentTime;
    }
    pop();
}   

function renderWave() {
  push();
  noStroke();
  fill(255);
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < yvalues.length; x++) {
    ellipse(x * xspacing, height - 200 + yvalues[x], 16, 16);
  }
  pop();
}

function calcWave() {
  theta += 2;

  // For every x value, calculate a y value with sine function
  let x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x) * amplitude;
    x += dx;
  }
}

function drawGraphics() {
    background(0);
    if (videoDraw) {
        // console.log("drawing: " + video)
        image(video, 0, 0, width, height);
    }
    if (perf1Graphics) {
        calcWave();
        renderWave();
        showBPM();
        // console.log('drawing perf 1 graphics');
    }
    if (prompt2Draw) {
        //DRAW TRANSITION DIALOGUE
        textAlign(CENTER, TOP);
        textFont(font);
        textSize(64);
        stroke(255);
        fill(255);
        text('The performance will continue when an audience member takes the stage...', 0, height/2 - 64, width);
    }
    if (buffering) {
        textAlign(CENTER, TOP);
        textFont(font);
        textSize(144);
        stroke(255);
        fill(255);
        text('RESULTS', 0, height/2 - 72, width);
    }
    if (drawResults === true) {
        let result = 'YOU GOT: ' + videoToLoad;
        textAlign(CENTER, TOP);
        textFont(font);
        textSize(144);
        stroke(255);
        fill(255);
        text(result, 0, 288, width);
    }
    if (startLights) { 
        let soundLvl = meter.getValue();
        // console.log(soundLvl);
        if (soundLvl < threshold && !exhaleSent && counter % 20 === 0) {
            console.log('sending exhale');
            //send exhale, set exhaleSent to true
            let breathState = 'exhale'
            socket.emit('breathing', breathState);
            exhaleSent = true;
        }
        if (soundLvl > threshold && exhaleSent && counter % 20 === 0) {
            console.log('sending inhale');
            //send inhale, set exhaleSent to false
            let breathState = 'inhale';
            socket.emit('breathing', breathState);
            exhaleSent = false;
        }
        counter++;
    }
}