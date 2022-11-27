const spawn = require('child_process').spawn;
const fs = require('fs');

const activateMusic = () => {
    const args = ['./youtube/audiocontrol.py'];
    const tts = spawn('python', args);
}

const pause = () => fs.writeFileSync('youtube/control/command.txt', '0');

const play = () => fs.writeFileSync('youtube/control/command.txt', '1');

const switchSong = (song) => fs.writeFileSync('youtube/control/command.txt', '2 ' + song);

module.exports = {activateMusic, pause, play, switchSong};

activateMusic();