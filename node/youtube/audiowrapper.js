const spawn = require('child_process').spawn;
const fs = require('fs');

let activated = false;

const activateMusic = () => {
    const args = ['./node/youtube/audiocontrol.py'];
    const tts = spawn('python', args);
    activated = true;
}

const pause = () => fs.writeFileSync('node/youtube/control/command.txt', '0');

const play = (song) => {
    if(!activated){
        activateMusic();
    }

    activated = true;

    if(song !== undefined){
        switchSong(song);
    }
    else{
        fs.writeFileSync('node/youtube/control/command.txt', '1');
    }
}

const switchSong = (song) => fs.writeFileSync('node/youtube/control/command.txt', '2 ' + song);

module.exports = {pause, play};