function drawGraphics() {
    background(0);
    if (titleCardDraw) {
        textAlign(CENTER, TOP);
        textFont(font);
        stroke(255, 255, 255, opacity);
        fill(255, 255, 255, opacity);
        push();
        textSize(144);
        text('WELCOME!', 0, height/2 - 150, width);
        pop();
        push();
        textSize(64);
        text('Please take a seat...', 0, height/2 + 100, width);
        pop();
    }
    if (titleCardDrawFadeout) {
        intervalID = setInterval(() => {
            if (opacity > 0) {
                opacity -= 3;
                console.log('opacity: ' + opacity);
            } else {
                clearInterval(intervalID);
                titleCardDraw = false;
            }
        }, 50);
        titleCardDrawFadeout = false;
    }
    if (endingCardDraw) {
        textAlign(CENTER, TOP);
        textFont(font);
        stroke(255, 255, 255, opacity);
        fill(255, 255, 255, opacity);
        push();
        textSize(144);
        text('THANK YOU', 0, height/2 - 100, width);
        pop();
    }
    if (endingCardDrawFadeup) {
        intervalID = setInterval(() => {
            if (opacity < 255) {
                opacity += 5;
                console.log('opacity: ' + opacity);
            } else {
                clearInterval(intervalID);
            }
        }, 50);
        endingCardDrawFadeup = false;
    }
    if (videoDraw) {
        // console.log("drawing: " + video)
        image(video, 0, 0, width, height);
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