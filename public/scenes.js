function checkScene() {
    //Load Show
    if (currentScene === 0) {
        titleCardDraw = false;
        sound1.stop();
    }
    //Pre Show Sound
    if (currentScene === 1) {
        opacity = 255;
        titleCardDraw = true;
        mic.close();
        sound1.volume.linearRampTo(-200, 0);
        sound1.volume.linearRampTo(-20, 5);
        sound1.start();
        sound1.loop = true;
        videoDraw = false;
    }
    //Pre Show Sound Fade Out, Video Start
    if (currentScene === 2) {
        titleCardDrawFadeout = true;
        setTimeout(() => {
            titleCardDraw = false;
        }, 6000);
        sound1.volume.linearRampTo(-96, 5);
        sound2.stop();
        sound2.volume.linearRampTo(0, 0);
        setTimeout(() => {
            sound1.stop();
        }, 8000);
        videoDraw = false;
        setTimeout(() => {
            videoDraw = true;
            mic.open();
        }, 5000);
    }
    //Chaos sound
    if (currentScene === 3) {
        p3q1.volume.linearRampTo(15, 0);
        p3q1.start();
        startLights = false;
        draw();
        // startLights = true;
    }
    //Start lights and stop chaos sound
    if (currentScene === 4) {
        p3q1.stop();
        startLights = true;
    }
    //Stop lights during Alexa's explanation of Memory Machine
    if (currentScene === 5) {
        startLights = false;
    }
    //Start Lights resume lights after Alexa's explanation of Memory Machine
    if (currentScene === 6) {
        startLights = true;
    }
    //Play first memory transition and start memory sound
    if (currentScene === 7) {
        p3q2.volume.linearRampTo(-200, 0);
        threshold = -65;
        startLights = false;
        p3q2.start();
        p3q2.loop = true;
        p3q2.volume.linearRampTo(-25, 10);
        setTimeout(() => {
            console.log("lights on");
            startLights = true;
        }, 10000);
    }
    //Play second memory transition
    if (currentScene === 8) {
        startLights = false;
        p3q2.volume.linearRampTo(-35, 10);
        setTimeout(() => {
            console.log("lights on");
            startLights = true;
        }, 10000);
    }
    //Fade to black then draw graphics
    if (currentScene === 9) {
        startLights = false;
        setTimeout(() => {
            videoDraw = false;
            opacity = 255;
            setTimeout(() => {
                endingCardDraw = true;
            }, 3000);
        }, 5000);
    }
}
