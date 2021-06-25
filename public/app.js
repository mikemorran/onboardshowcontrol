console.log('hello world');

window.addEventListener('load', () => {
    socket.emit('scenechange', currentScene);
    windowLoaded = true;
});

function keyPressed() {
    if (windowLoaded) {
        console.log('key pressed');
        if (keyCode === LEFT_ARROW && currentScene > 0) {
            currentScene -= 1;
            socket.emit('scenechange', currentScene);
            console.log('scene ' + currentScene);
            checkScene();
        }
        if (keyCode === RIGHT_ARROW) {
            currentScene += 1;
            socket.emit('scenechange', currentScene);
            console.log('scene ' + currentScene);
            checkScene();
        }
        // if (keyCode === 49) {
        //     videoToLoad = 'Katie';
        // }
        // if (keyCode === 50) {
        //     videoToLoad = 'Will';
        // }
        // if (keyCode === 51) {
        //     videoToLoad = 'Cat';
        // }
        // if (keyCode === 52) {
        //     videoToLoad = 'Mfon';
        // }
        // if (keyCode === 53) {
        //     videoToLoad = 'Elvin';
        // }
        if (keyCode === 65) {
            console.log('a was pressed');
            panner.pan.rampTo(-1, 0);
            reverb._decay = 0;
            // console.log(dist);
            console.log(reverb);
            // console.log(panner);
            pitchShift.pitch = 5;
            let speaker = 'good';
            socket.emit('speaking', speaker);
        }
        //Press d
        if (keyCode === 68) {
            console.log('d was pressed');
            panner.pan.rampTo(1, 0);
            reverb._decay = 2;
            // console.log(panner);
            console.log(dist);
            pitchShift.pitch = -3;
            let speaker = 'evil';
            socket.emit('speaking', speaker);
        }
        if (keyCode === 83) {
            console.log('s was pressed');
            panner.pan.rampTo(0, 0);
            pitchShift.pitch = 0;
            reverb._decay = 0;
            // console.log(panner);
            let speaker = 'both';
            socket.emit('speaking', speaker);
        }
    }
}

function draw() {
    drawGraphics();
    // background(0);
}

function windowResized() {
    try {
        videoWidth = document.getElementById('videoCaptureDiv').offsetWidth;
        videoHeight = document.getElementById('videoCaptureDiv').offsetHeight;
        resizeCanvas(videoWidth, videoHeight);
    } catch {
        console.log('no video capture');
    }
}