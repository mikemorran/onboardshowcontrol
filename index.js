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

let interval6;
function checkScene(currentScene) {
    //Pre show lights
    if (currentScene === 0) {
        for (i = 0; i < friendlyNames.length; i++) {
            client.publish('zigbee2mqtt/' + friendlyNames[i] + '/set', '{"brightness" : 254, "color":{"r":253,"g":244,"b":220}}');
        }
    }
    //Cue 1 lights
    if (currentScene === 1) {
        for (i = 0; i < friendlyNames.length; i++) {
            client.publish('zigbee2mqtt/' + friendlyNames[i] + '/set', '{"brightness" : 254, "color":{"r":255,"g":255,"b":255}}');
        } 
    }
    //Cue 1 lights
    if (currentScene === 2) {
        for (i = 0; i < friendlyNames.length; i++) {
            client.publish('zigbee2mqtt/' + friendlyNames[i] + '/set', '{"brightness" : 254, "color":{"r":255,"g":255,"b":255}}');
        } 
    }
    if (currentScene === 3) {
        setIntervalRandomHue(randomHue, 700, 17)
    }
    //Transition into blue light
    if (currentScene === 4) {
        hueOutput = JSON.stringify({"r": 146, "g": 193, "b": 233});
        console.log(hueOutput);
        for (i = 0; i < friendlyNames.length; i++) {
            if (i < 2) {
                client.publish('zigbee2mqtt/'+ friendlyNames[i] +'/set', '{"brightness" : 254, "color" : ' + hueOutput+ ', "transition" : 70}');
            }
        }
    }
    //Transition into memory lights
    if (currentScene === 7) {
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
    //Transition into memory part 2 lights
    if (currentScene === 8) {
        hueOutput = JSON.stringify({"r": 254, "g": 66, "b": 254});
        console.log(hueOutput);
        for (i = 0; i < friendlyNames.length; i++) {
            if (i < 2) {
                client.publish('zigbee2mqtt/'+ friendlyNames[i] +'/set', '{"brightness" : 200, "color" : ' + hueOutput+ ', "transition" : 10}');
            }
        }
    }
    //Fade to black
    if (currentScene === 9) {
        hueOutput = JSON.stringify({"r": 254, "g": 66, "b": 254});
        console.log(hueOutput);
        for (i = 0; i < friendlyNames.length; i++) {
            if (i < 2) {
                client.publish('zigbee2mqtt/'+ friendlyNames[i] +'/set', '{"brightness" : 0, "color" : ' + hueOutput+ ', "transition" : 5}');
            }
        }
    }
}

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
