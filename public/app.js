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