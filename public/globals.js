let video;
let videoWidth = 0;
let videoHeight = 0;
let Canvas;
let currentScene = 0;
let windowLoaded = false;
let micOpen = false;
let videoDraw = false;
let sound1, sound2, sound3;
let p3q1, p3q2, p3q3, p3q4;
let videoToLoad = "Emeril Lagasse's Power Air Fryer 360";
let vid;
let buffering = false;
let prompt2Draw;
let startLights;
let counter = 0;
let exhaleSent = true;
let threshold = -60;
let videoReset = false;
let font;
let speechSynth = window.speechSynthesis;
let utteranceScene = 0;
let speechSynthComplete = false;
let titleCardDraw = false;
let titleCardDrawFadeout = false;
let opacity = 255;
let intervalSet = false;
let intervalID;
let endingCardDraw = false;
let endingCardDrawFadeup = false;
let utterances = [
    "Good morning Michael. I am your virtual health assistant from Amazon Care. It is time to begin your daily routine. Please make sure your biometric sensors are active.",
    "Now receiving data. You are currently subscribed to three morning routines. We do not advise that you attempt more than one routine at a time.",
    "Okay. You are currently subscribed to the morning routines named, High-Intensity-Interval-Training, Mindful-Affirmations, and Art-ful Healthy Cooking. Your current completion streak is nineteen-hundred and five days with a consistency benefit of seventy-six percent off your monthly rate. Your next reward will be at two thousand days of completion. Would you like to begin?",
    "Okay. Beginning in 5, 4, 3, 2, 1",
    " ",
    "Alternate raising your knees to this beat",
    "Take two slices of bread and place them in the toaster. Begin to toast the bread.",
    "Hold the microphone in front of your face and begin breathing deeply.",
    "Double Time",
    "Relax and clear your mind.",
    "While you wait for the bread to toast, cut the avocado in half.",
    "Continue breathing deeply and clearly for the algorithm.",
    " ",
    "Begin squatting to this beat",
    "Now that you have cut the avocado in half, carefully remove the pit.", 
    "Double Time",
    "Remove the avocado skin while keeping the avocado halves in-tact.",
    "Find the next level of relaxation as you begin noticing the places your mind is wandering.",
    "As you exhale, begin repeating your first mindful affirmation: I have plenty of time.",
    " ",
    "Begin doing jumping jacks to the beat",
    "Cut your two halves of avocado horizontally into strips two millimeters wide. Use the ruler to measure. You will be judged on your precision later",
    "Please use both arms when completing jumping jacks",
    "Make sure you speak directly in the microphone so that your affirmations will be logged",
    "Double Time",
    "Make sure you are keeping up with the tempo.",
    " ",
    "Begin doing jump squats to this beat",
    "Focus on your breathing to lower your brain activity. Begin to repeat your second affirmation: Everything has a purpose.",
    "Please keep up with the perscribed exercise or the program will end",
    "Your brain activity is too high",
    "Please continue to face the camera so that your cooking progress can be logged.",
    " ",
    "You have failed to complete the morning routines named: High-Intensity-Interval-Training, Mindful-Affirmations, and Art-ful Healthy Cooking. Unfortunately, your consistency benefit has been reset to zero. Your next reward will be at 21 days of completion. See you tomorrow."
];
let SSUtterances = [];
let utteranceTimeoutCount = 0;
let utteranceTimeouts = [5, 1, 1, 0, 1, 4, 5, 2, 3, 4, 6, 2, 1, 3, 5, 3, 5, 3, 2, 1, 4, 5, 4, 3, 5, 5, 1, 3, 2, 3, 6, 5, 7];
let soundEffect1;
let volumeEffect1;
let perf1Graphics = false;
let drawResults = false;
let alarm;