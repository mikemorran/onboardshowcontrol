const mic = new Tone.UserMedia();
mic.output._unmutedVolume = 10;
console.log(mic);
const panner = new Tone.Panner(0);
const volume = new Tone.Volume(50).toDestination();
const meter = new Tone.Meter();
const pitchShift = new Tone.PitchShift();
pitchShift.pitch = 0;
const reverb = new Tone.Reverb(0.01);
mic.connect(meter);
meter.connect(pitchShift);
pitchShift.connect(reverb);
reverb.connect(panner);
panner.connect(volume);

function loadAssets() {
    sound1 = new Tone.Player('assets/openingsound.mp3').toDestination();
    sound1.volume = -96;
    p3q1 = new Tone.Player('assets/P3Q1.mp3').toDestination();
    p3q2 = new Tone.Player('assets/P3Q2.mp3').toDestination();
    p3q3 = new Tone.Player('assets/P3Q3.mp3').toDestination();
    p3q4 = new Tone.Player('assets/P3Q4.mp3').toDestination();
    font = loadFont('assets/Krungthep.ttf');
}

function vidLoaded() {
    console.log(vid);
    vid.id = 'advertisement';
    vid.size(document.getElementById('body').offsetWidth, document.getElementById('body').offsetHeight);
    vid.play();
}

function setup() {
    //Setup Canvas
    videoWidth = document.getElementById('videoCaptureDiv').offsetWidth;
    videoHeight = document.getElementById('videoCaptureDiv').offsetHeight;
    console.log(videoWidth, videoHeight);
    Canvas = createCanvas(videoWidth, videoHeight);
    Canvas.parent('videoCaptureDiv');

    //Setup Video Capture
    video = createCapture(VIDEO);
    video.hide();

    //Setup Sound
    loadAssets();

    //Setup Speech Synthesis
    setupSpeechSynth();

    w = width + 16;
    dx = (TWO_PI / period) * xspacing;
    yvalues = new Array(floor(w / xspacing));
    console.log(yvalues);
}