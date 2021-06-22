function setupSpeechSynth() {
    var voices = speechSynth.getVoices();
    //console.log(voices);
    for (i = 0; i < utterances.length; i++) {
        let ssutterance = new SpeechSynthesisUtterance(utterances[i]);
        ssutterance.voice = voices[52];
        ssutterance.rate = 0.75;
        SSUtterances.push(ssutterance);
    }

    soundEffect1 = new Tone.FatOscillator("Ab3", "sawtooth", 40);
    volumeEffect1 = new Tone.Volume(-15).toDestination();
    soundEffect1.connect(volumeEffect1);
    console.log(soundEffect1);
    Tone.Transport.start();
    Tone.Transport.loop = true;
    Tone.Transport.loopEnd = 1;
}

function newTimeout() {
    if (speechSynthComplete) {
        console.log('speech synth complete');
    } else {
        utteranceScene++;
        let timeout = utteranceTimeouts[utteranceTimeoutCount] * 1000;
        console.log('current timeout is ' + timeout + ' seconds');
        setTimeout(runSpeechSynth, timeout);
        utteranceTimeoutCount++;
    }
}

function runSpeechSynth() {
        console.log('runAudio called');
        speechSynth.speak(SSUtterances[utteranceScene]);
        SSUtterances[utteranceScene].onend = newTimeout;
        // if (utteranceScene === 1) {
        //     perf1Graphics = true;
        // }
        if (utteranceScene === 4) {
            soundEffect1.start();
            soundEffect1.stop('+1');
            sound3.volume.rampTo(-20, 0);
            sound3.start();
            currentScene += 1;
            socket.emit('scenechange', currentScene);
        }
        if (utteranceScene === 12) {
            soundEffect1.start();
            soundEffect1.stop('+1');
            Tone.Transport.loopEnd = 2;
        }
        if (utteranceScene === 19) {
            soundEffect1.start();
            soundEffect1.stop('+1');
            Tone.Transport.loopEnd = 1.5;
        }
        if (utteranceScene === 26) {
            soundEffect1.start();
            soundEffect1.stop('+1');
            Tone.Transport.loopEnd = 0.5;
        }
        if (utteranceScene === 32) {
            sound3.volume.linearRampTo(-200, 5);
            setTimeout(() => {
                sound3.stop()
            }, 6);
            currentScene += 1;
            socket.emit('scenechange', currentScene);
        }
        if (utteranceScene === 33) {
            speechSynthComplete = true;
        }
}