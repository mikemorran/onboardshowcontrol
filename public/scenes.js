function checkScene() {
    let timeout1 = null;
    let timeout2 = null;
    let timeout3 = null;
    let timeout4 = null;
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
    //Pre Show Sound Fade, Video Start
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
        }, 5000);
        setTimeout(() => {
            alarm.volume.linearRampTo(-5, 0);
            alarm.start();
            alarm.loop = false;
            setTimeout(() => {
                alarm.volume.linearRampTo(-200, 2);
                alarm.stop();
            }, 7000);
        }, 10000);
    }
    //Morning Sound
    if (currentScene === 3) {
        perf1Graphics = false;
        videoDraw = true;
        sound1.stop();
        sound2.start();
        sound2.loop = false;
        setTimeout(() => {
            sound2.volume.linearRampTo(-200, 10);
            setTimeout(() => {
                sound2.stop();
            }, 15000);
        }, 7000);
    }
    //Speech Synth Start
    if (currentScene === 4) {
        // perf1Graphics = true;
        speechSynthComplete = false;
        sound2.stop();
        runSpeechSynth();
        mic.open();
        prompt2Draw = false;
    }
    if (currentScene === 6) {
        mic.close();
        // perf1Graphics = false;
    }
    //Speech Synthesis stop and prompt audience member
    if (currentScene === 7) {
        speechSynthComplete = true;
        videoDraw = false;
        timeout4 = setTimeout(() => {
            prompt2Draw = true;
        }, 5000);
    }
    //Video start
    if (currentScene === 8) {
        mic.open();
        clearTimeout(timeout4);
        videoDraw = true;
        prompt2Draw = false;
        buffering = false;
    }
    //Results Graphic
    if (currentScene === 9) {
        videoDraw = false;
        buffering = true;
        drawResults = false;
    }
    //Results reveal and video playback
    if (currentScene === 10) {
        drawResults = false;
        videoDraw = false;
        buffering = false;
        timeout1 = setTimeout(() => {
            buffering = false;
            drawResults = true;
            currentScene += 1;
            socket.emit('scenechange', currentScene);
            if (currentScene === 11) {
                timeout2 = setTimeout(() => {currentScene += 1;
                    socket.emit('scenechange', currentScene);
                    if (currentScene === 12) {
                        timeout3 = setTimeout(() => {
                            mic.close()
                            drawResults = false;
                            noCanvas();
                            let videoPath = 'assets/' + videoToLoad +'.mp4'
                            vid = createVideo(videoPath, vidLoaded);
                            document.getElementById('videoCaptureDiv').style.display = 'none';
                        }, 5000);
                    }
                }, 6000);
            }
        }, 10000);
    }
    if (currentScene === 13) {
        mic.open();
    }
    //Chaos sound
    if (currentScene === 14) {
        p3q1.start();
        startLights = false;
        draw();
        // startLights = true;
    }
    //Start lights and stop chaos sound
    if (currentScene === 15) {
        p3q1.stop();
        startLights = true;
    }
    //Stop lights
    if (currentScene === 16) {
        startLights = false;
    }
    //Start Lights
    if (currentScene === 17) {
        startLights = true;
    }
    //Play first memory transition and start memory sound
    if (currentScene === 18 || currentScene === 23) {
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
    if (currentScene === 19) {
        startLights = false;
        p3q2.volume.linearRampTo(-35, 10);
        setTimeout(() => {
            console.log("lights on");
            startLights = true;
        }, 10000);
    }
    //Stop lights and stop memory sound
    if (currentScene === 20) {
        startLights = false;
        p3q2.stop();
    }
    //Epic sound
    if (currentScene === 21) {
        p3q3.volume.linearRampTo(-5, 0)
        startlights = false;
        p3q3.start();
        setTimeout(() => {
            currentScene += 1;
            console.log('current scene : ' + currentScene);
            socket.emit('scenechange', currentScene);
            checkScene();
            setTimeout(() => {
                p3q3.stop();
                console.log("sound off");
            }, 3500);
        }, 20000);
    }
    if (currentScene === 23) {
        setTimeout(() => {
            mic.close();
            currentScene += 1;
            socket.emit('scenechange', currentScene);
            checkScene();
        }, 47000)
    }
    //Emril Legasse Again
    if (currentScene === 24){
        buffering = true;
        videoDraw = false;
        startLights = false;
        p3q2.stop();
        p3q4.volume.linearRampTo(5, 0);
        p3q4.start();
        p3q4.loop = false;
        setTimeout(() => {
            drawResults = false;
            videoDraw = false;
            buffering = false;
            currentScene += 1;
            socket.emit('scenechange', currentScene);
            buffering = false;
            drawResults = true;
            currentScene += 1;
            socket.emit('scenechange', currentScene);
            if (currentScene === 26) {
                timeout2 = setTimeout(() => {
                    currentScene += 1;
                    socket.emit('scenechange', currentScene);
                    if (currentScene === 27) {
                        timeout3 = setTimeout(() => {
                            mic.close()
                            drawResults = false;
                            videoReset = false;
                            noCanvas();
                            let videoPath = 'assets/' + videoToLoad +'.mp4'
                            vid = createVideo(videoPath, vidLoaded);
                            document.getElementById('videoCaptureDiv').style.display = 'none';
                        }, 1000);
                    }
                }, 3000);
            }
        }, 22250);
    }
    if (currentScene === 28) {
        videoDraw = true;
    }
    if (currentScene === 29) {
        opacity = 0;
        videoDraw = false;
        endingCardDraw = true;
        endingCardDrawFadeup = true;
    }
    //Timeout Clearance 
    if (currentScene !== 10) {
        clearTimeout(timeout1);
    }
    if (currentScene !== 11) {
        clearTimeout(timeout2);
    }
    if (currentScene !== 12 || currentScene !== 26) {
        clearTimeout(timeout3);
    }
    if (currentScene !== 7) {
        prompt2Draw = false;
    }
    //Reset Canvas
    if (currentScene >= 13) {
        console.log('canvas reset');
        drawResults = false;
        if (!videoReset) {
            try {
                vid.hide();
            } catch {
                console.log('video not loaded');
            }
            document.getElementById('videoCaptureDiv').style.display = 'block';
            Canvas = createCanvas(videoWidth, videoHeight);
            Canvas.parent('videoCaptureDiv');
            video = createCapture(VIDEO);
            video.hide();
            background(0);
            videoDraw = true;
            p3q1.stop();
            videoReset = true;
        }
    }
}
