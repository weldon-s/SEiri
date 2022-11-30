const { toUSVString } = require("util");

const spawn = require("child_process").spawn;

// adapted from https://stackoverflow.com/questions/23450534/how-to-call-a-python-function-from-node-js
// let dsStart = new Promise(() => { // is this notation bad? idk and idc
//     const ds = spawn('python', ['./python/ds.py']);

//     ds.stdout.on('data', (data) => {
//         console.log(data);
//     });

//     ds.stderr.on('data', (data) => {
//         console.error(data);
//     });
// });

// this might be jank but i think it'll work
// the idea is for listen() to wait until the button is pressed, record audio, parse that audio, and return the text
// at this point, listen will be re-called when the code is ready again
async function listen() {
    const listener = spawn('python/bin/python', ['/home/pi/SEiri/node/python/listener.py']);

    // when it outputs anything, if it's a string, that must be detected audio
    return new Promise((resolve, reject) => {
        listener.stdout.on('data', (data) => {
            if (typeof data == `string` || data instanceof String) {
                // if (data.charAt(0) == '>') resolve(data.slice(1));
                // else console.log(data);
                console.log(data);
            } else {
                // idk when this would ever happen
                // // update- turns out this is actually what we're looking for
                // console.log("Unusual linstener output:");
                // console.log(data.toString());
                // reject("!WARNING: unusual output")
                console.log("data");
                resolve(data.toString());
            }
        });
    
        listener.stderr.on('data', (data) => {
            console.error(data.toString());
            // reject("!ERROR: the python code has crashed!");
        })    
    });
}

function speak(text) {
    const tts = spawn('python', ['/home/pi/SEiri/node/python/textToSpeech.py', text]);

    tts.stdout.on('data', (data) => {
        console.log(data.toString());
    });

    tts.stderr.on('data', (data) => {
        console.error(data.toString());
    });

    if (tts) return true;
    else return false;
}

module.exports = {speak, listen};     
