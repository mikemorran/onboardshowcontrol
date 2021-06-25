let express = require('express');
let app = express();
app.use('/', express.static('public'));
let http = require('http');
let server = http.createServer(app);
let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('Server listening at port: ' + port);
});
let mqtt = require('mqtt');
let client = mqtt.connect('mqtt://169.254.122.202:1883');

let friendlyNames = ['0x0017880109ceac0b', '0x0017880109ceafc8', '0x0017880109ce6533', '0x0017880109d12442'];
// let friendlyNames = ['0x0017880109ce6533', '0x0017880109d12442'];

client.on('connect', function () {
    client.subscribe('presence', function (err) {
        if (!err) {
            client.publish('presence', 'Hello mqtt');
        }
    });
});

client.on('message', (topic, message) => {
    console.log(message.toString());
});

let io = require('socket.io')(server);

io.sockets.on('connection', (socket) => {
    console.log('New client: ' + socket.id);

    socket.on('scenechange', (currentScene) => {
        checkScene(currentScene);
    });
    socket.on('speaking', (speaker) => {
        checkSpeaker(speaker);
    });
    socket.on('breathing', (breathState) => {
        // console.log(breathState)
        checkBreathing(breathState);
    });
});

function checkBreathing(breathState) {
    console.log(breathState);
    if (breathState === 'inhale') {
        for (i = 0; i < friendlyNames.length; i++) {
            if (i < 2) {
                client.publish('zigbee2mqtt/' + friendlyNames[i] + '/set', '{"brightness_move" : 250}');
            } 
            // else {
            //     client.publish('zigbee2mqtt/' + friendlyNames[i] + '/set', '{"brightness_move" : 50}');
            // }
        }
    }
    if (breathState === 'exhale') {
        for (i = 0; i < friendlyNames.length; i++) {
            if (i < 2) {
                client.publish('zigbee2mqtt/' + friendlyNames[i] + '/set', '{"brightness_move" : -150}');
            } 
            // else {
            //     client.publish('zigbee2mqtt/' + friendlyNames[i] + '/set', '{"brightness_move" : -30}');
            // }
        }
    }
}

let interval1;
let interval2;
let interval3;
let interval4;
let interval5;
let interval6;
function checkScene(currentScene) {
    if (currentScene === 0) {
        for (i = 0; i < friendlyNames.length; i++) {
            client.publish('zigbee2mqtt/' + friendlyNames[i] + '/set', '{"brightness" : 254, "color":{"r":253,"g":244,"b":220}}');
        }
    }
    if (currentScene === 1) {
        let randomR, randomB;
        setTimeout(() => {interval1 = setInterval(() => {
            for (i = 0; i < friendlyNames.length; i++) {
                if (i % 1 === 0) {
                    randomR = Math.floor(Math.random() * 255);
                    randomB = Math.floor(Math.random() * 255);
                    client.publish('zigbee2mqtt/' + friendlyNames[i] + '/set', '{"brightness" : 150, "color":{"r":' + randomR + ',"g":0,"b":' + randomB +'}, "transition" : 3}');
                }
            }
        }, 6000)}, 3000);
        interval2 = setInterval(() => {
            for (j = 0; j < friendlyNames.length; j++) {
                if (j % 1 === 0) {
                    client.publish('zigbee2mqtt/' + friendlyNames[j] + '/set', '{"brightness" : 1, "color":{"r":' + randomR + ',"g":0,"b":' + randomB +'}, "transition" : 3}');
                }
            }
        }, 6000);
    }
    if (currentScene !== 1) {
        clearInterval(interval1);
        clearInterval(interval2);
    }
    if (currentScene === 2) {
        for (i = 0; i < friendlyNames.length; i++) {
            client.publish('zigbee2mqtt/' + friendlyNames[i] + '/set', '{"brightness" : 0, "color":{"r":255,"g":255,"b":255}, "transition" : 5}');
        } 
    }
    if (currentScene === 3) {
        for (i = 0; i < friendlyNames.length; i++) {
            client.publish('zigbee2mqtt/' + friendlyNames[i] + '/set', '{"brightness" : 254, "color":{"r":255,"g":241,"b":165}, "transition" : 3}')
        }
    }
    if (currentScene !== 5) {
        clearInterval(interval3);
    }
    if (currentScene === 5) {
        for (i = 0; i < friendlyNames.length; i++) {
            let randomR = Math.floor(Math.random() * 255);
            let randomG = Math.floor(Math.random() * 255);
            let randomB = Math.floor(Math.random() * 255);
            client.publish('zigbee2mqtt/' + friendlyNames[i] + '/set', '{"brightness" : 254, "color":{"r":'+ randomR +',"g":'+ randomG +',"b":'+ randomB +'}}')
        }
        interval3 = setInterval(() => {
            for (i = 0; i < friendlyNames.length; i++) {
                let randomR = Math.floor(Math.random() * 255);
                let randomG = Math.floor(Math.random() * 255);
                let randomB = Math.floor(Math.random() * 255);
                client.publish('zigbee2mqtt/' + friendlyNames[i] + '/set', '{"brightness" : 254, "color":{"r":'+ randomR +',"g":'+ randomG +',"b":'+ randomB +'}}')
            }
        }, 940);
    }
    if (currentScene === 6) {
        for (i = 0; i < friendlyNames.length; i++) {
            client.publish('zigbee2mqtt/' + friendlyNames[i] + '/set', '{"brightness" : 254, "color":{"r":255,"g":241,"b":165}, "transition" : 5}');
        }
    }
    if (currentScene === 7) {
        for (i = 0; i < friendlyNames.length; i++) {
            client.publish('zigbee2mqtt/' + friendlyNames[i] + '/set', '{"brightness" : 100, "color":{"r":255,"g":241,"b":165}, "transition" : 5}');
        }
    }
    if (currentScene === 8) {
        for (i = 0; i < friendlyNames.length; i++) {
            if (friendlyNames[i] === '0x0017880109ce6533' || friendlyNames[i] === '0x0017880109ceac0b') {
                client.publish('zigbee2mqtt/' + friendlyNames[i] + '/set', '{"brightness" : 254, "color":{"r":0,"g":0,"b":255}}');
            } 
            if (friendlyNames[i] === '0x0017880109d12442' || friendlyNames[i] === '0x0017880109ceafc8') {
                client.publish('zigbee2mqtt/' + friendlyNames[i] + '/set', '{"brightness" : 254, "color":{"r":255,"g":0,"b":0}}');
            }
        }
    }
    if (currentScene === 9) {
        for (i = 0; i < friendlyNames.length; i++) {
            client.publish('zigbee2mqtt/' + friendlyNames[i] + '/set', '{"brightness" : 254, "color":{"r":253,"g":244,"b":220}, "transition" : 5}');
        }
    }
    if (currentScene === 10) {
        for (i = 0; i < friendlyNames.length; i++) {
            client.publish('zigbee2mqtt/' + friendlyNames[i] + '/set', '{"brightness" : 1, "color":{"r":253,"g":244,"b":220}, "transition" : 1}');
        }
        setTimeout(() => {
            for (i = 0; i < friendlyNames.length; i++) {
                client.publish('zigbee2mqtt/' + friendlyNames[i] + '/set', '{"brightness" : 254, "color":{"r":253,"g":244,"b":220}, "transition" : 1}');
            }
        }, 1000);
        interval4 = setInterval(() => {
            for (i = 0; i < friendlyNames.length; i++) {
                client.publish('zigbee2mqtt/' + friendlyNames[i] + '/set', '{"brightness" : 1, "color":{"r":253,"g":244,"b":220}, "transition" : 1}');
            }
        }, 2000);
        setTimeout(()=> {interval5 = setInterval(() => {
            for (i = 0; i < friendlyNames.length; i++) {
                client.publish('zigbee2mqtt/' + friendlyNames[i] + '/set', '{"brightness" : 254, "color":{"r":253,"g":244,"b":220}, "transition" : 1}');
            }
        }, 2000)}, 1000);
    }
    if (currentScene !== 10) {
        clearInterval(interval4);
        clearInterval(interval5);
    }
    if (currentScene === 11 || currentScene === 25) {
        for (i = 0; i < friendlyNames.length; i++) {
            client.publish('zigbee2mqtt/' + friendlyNames[i] + '/set', '{"brightness" : 254, "color":{"r":253,"g":244,"b":220}, "transition" : 1}');
        }
    }
    if (currentScene === 12) {
        for (i = 0; i < friendlyNames.length; i++) {
            client.publish('zigbee2mqtt/' + friendlyNames[i] + '/set', '{"brightness" : 1, "color":{"r":253,"g":244,"b":220}, "transition" : 5}');
        }
    }
    if (currentScene === 13) {
        for (i = 0; i < friendlyNames.length; i++) {
            client.publish('zigbee2mqtt/' + friendlyNames[i] + '/set', '{"brightness" : 100, "color":{"r":253,"g":244,"b":220}, "transition" : 5}');
        }
    }
    if (currentScene !== 16) {
        clearInterval(interval6);
    }
    if (currentScene === 14) {
        setIntervalRandomHue(randomHue, 700, 17)
    }
    if (currentScene === 15) {
        hueOutput = JSON.stringify({"r": 146, "g": 193, "b": 233});
        console.log(hueOutput);
        for (i = 0; i < friendlyNames.length; i++) {
            if (i < 2) {
                client.publish('zigbee2mqtt/'+ friendlyNames[i] +'/set', '{"brightness" : 254, "color" : ' + hueOutput+ ', "transition" : 70}');
            }
        }
    }
    if (currentScene === 16 || currentScene === 20 || currentScene === 24) {
        hueOutput = JSON.stringify({"r": 255, "g": 255, "b": 255});
        console.log(hueOutput);
        for (i = 0; i < friendlyNames.length; i++) {
            client.publish('zigbee2mqtt/'+ friendlyNames[i] +'/set', '{"brightness" : 254, "color" : ' + hueOutput+ '}')
        }
    }
    if (currentScene === 17) {
        hueOutput = JSON.stringify({"r": 146, "g": 193, "b": 233});
        console.log(hueOutput);
        for (i = 0; i < friendlyNames.length; i++) {
            if (i < 2) {
                client.publish('zigbee2mqtt/'+ friendlyNames[i] +'/set', '{"brightness" : 254, "color" : ' + hueOutput+ '}');
            } else {
                client.publish('zigbee2mqtt/'+ friendlyNames[i] +'/set', '{"brightness" : 0, "color" : ' + hueOutput+ '}');
            }
        }
    }
    if (currentScene === 18 || currentScene === 23) {
        hueOutput = JSON.stringify({"r": 66, "g": 96, "b": 245});
        console.log(hueOutput);
        for (i = 0; i < friendlyNames.length; i++) {
            if (i < 2) {
                client.publish('zigbee2mqtt/'+ friendlyNames[i] +'/set', '{"brightness" : 200, "color" : ' + hueOutput+ ', "transition" : 10}');
            } else {
                client.publish('zigbee2mqtt/'+ friendlyNames[i] +'/set', '{"brightness" : 0, "color" : ' + hueOutput+ '}');
            }
        } 
    }
    if (currentScene === 19) {
        hueOutput = JSON.stringify({"r": 254, "g": 66, "b": 254});
        console.log(hueOutput);
        for (i = 0; i < friendlyNames.length; i++) {
            if (i < 2) {
                client.publish('zigbee2mqtt/'+ friendlyNames[i] +'/set', '{"brightness" : 200, "color" : ' + hueOutput+ ', "transition" : 10}');
            }
        }
    }
    if (currentScene === 21) {
        hueOutput = JSON.stringify({"r": 252, "g": 198, "b": 3});
        for (i = 0; i < friendlyNames.length; i++) {
            client.publish('zigbee2mqtt/'+ friendlyNames[i] +'/set', '{"brightness" : 200, "color" : ' + hueOutput+ ', "transition" : 10}');
        }
        setIntervalEpicHue(epicHue, 2000, 12);
    }
    if (currentScene === 26) {
        for (i = 0; i < friendlyNames.length; i++) {
            client.publish('zigbee2mqtt/' + friendlyNames[i] + '/set', '{"brightness" : 1, "color":{"r":253,"g":244,"b":220}, "transition" : 3}');
        }
    }
    if (currentScene === 28) {
        hueOutput = JSON.stringify({"r": 255, "g": 255, "b": 255});
        for (i = 0; i < friendlyNames.length; i++) {
            client.publish('zigbee2mqtt/'+ friendlyNames[i] +'/set', '{"brightness" : 0, "color" : ' + hueOutput+ '}');
        }
    }
    if (currentScene === 29) {
        hueOutput = JSON.stringify({"r": 255, "g": 255, "b": 255});
        for (i = 0; i < friendlyNames.length; i++) {
            client.publish('zigbee2mqtt/'+ friendlyNames[i] +'/set', '{"brightness" : 255, "color" : ' + hueOutput+ ', "transition" : 5}');
        }
    }
}

let colorOn = true;
function epicHue() {
    hueOutput = JSON.stringify({"r": 252, "g": 198, "b": 3});
    if (colorOn) {
        brightness = 254;
        colorOn = false;
    } else {
        brightness = 5;
        colorOn = true;
    }
    console.log(hueOutput);
    for (i = 0; i < friendlyNames.length; i++) {
        client.publish('zigbee2mqtt/'+ friendlyNames[i] +'/set', '{"brightness" : ' + brightness + ', "color" : ' + hueOutput+ ', "transition" : 0.5}');
    }
}

function setIntervalEpicHue(callback, delay, repetitions) {
    var counter = 0;
    var intervalID = setInterval(function () {
        callback();
        if (++counter === repetitions) {
            clearInterval(intervalID);
            hueOutput = JSON.stringify({"r": 255, "g": 255, "b": 255});
            console.log(hueOutput);
            for (i = 0; i < friendlyNames.length; i++) {
                client.publish('zigbee2mqtt/'+ friendlyNames[i] +'/set', '{"brightness" : 255, "color" : ' + hueOutput+ '}');
            }
       }
    }, delay);
};

function setIntervalRandomHue(callback, delay, repetitions) {
    var counter = 0;
    interval6 = setInterval(function () {
       callback();
       if (++counter === repetitions) {
           clearInterval(interval6);
           hueOutput = JSON.stringify({"r": 193, "g": 14, "b": 14});
            for (i = 0; i < friendlyNames.length; i++) {
                if (i < 2) {
                    client.publish('zigbee2mqtt/'+ friendlyNames[i] +'/set', '{"brightness" : 50, "color" : ' + hueOutput+ '}');
                } else {
                    client.publish('zigbee2mqtt/'+ friendlyNames[i] +'/set', '{"brightness" : 0, "color" : ' + hueOutput+ '}');
                }
            }
       }
    }, delay);
};

function randomHue() {
    let random1 = Math.floor(Math.random() * 255);
    let random2 = Math.floor(Math.random() * 255);
    let random3 = Math.floor(Math.random() * 255);
    hueOutput = JSON.stringify({"r": random1, "g": random2, "b": random3});
    console.log(hueOutput);
    for (i = 0; i < friendlyNames.length; i++) {
        client.publish('zigbee2mqtt/'+ friendlyNames[i] +'/set', '{"brightness" : 254, "color" : ' + hueOutput+ '}')
    }
}

function checkSpeaker(speaker) {
    console.log(speaker);
    if (speaker === 'evil') {
        for (i = 0; i < friendlyNames.length; i++) {
            client.publish('zigbee2mqtt/' + friendlyNames[i] + '/set', '{"brightness" : 254, "color":{"r":255,"g":0,"b":0}}');
        }
    }
    if (speaker === 'good') {
        for (i = 0; i < friendlyNames.length; i++) {
            client.publish('zigbee2mqtt/' + friendlyNames[i] + '/set', '{"brightness" : 254, "color":{"r":0,"g":0,"b":255}}');
        }
    }
    if (speaker === 'both') {
        for (i = 0; i < friendlyNames.length; i++) {
            if (friendlyNames[i] === '0x0017880109ce6533' || friendlyNames[i] === '0x0017880109ceac0b') {
                client.publish('zigbee2mqtt/' + friendlyNames[i] + '/set', '{"brightness" : 254, "color":{"r":0,"g":0,"b":255}}');
            } 
            if (friendlyNames[i] === '0x0017880109d12442' || friendlyNames[i] === '0x0017880109ceafc8') {
                client.publish('zigbee2mqtt/' + friendlyNames[i] + '/set', '{"brightness" : 254, "color":{"r":255,"g":0,"b":0}}');
            }
        }
    }
};