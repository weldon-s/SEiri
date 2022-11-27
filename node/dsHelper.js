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

function dsStart(input) {
    const ds = spawn('python', ['./node/python/ds.py', input]);

    ds.stdout.on('data', (data) => {
        console.log(data.toString());
    });

    ds.stderr.on('data', (data) => {
        console.error(data.toString());
    });

    if (ds) return true;
    else return false;
}

module.exports = {dsStart};     