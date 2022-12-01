const spawn = require('child_process').spawn;
const fs = require('fs');

let activated = false;

const activateMusic = () => {
    const args = ['/home/pi/SEiri/node/youtube/audiocontrol.py'];
    const tts = spawn('python/bin/python', args);
    
    tts.stdout.on('data', (data) => console.log(data.toString()));
    tts.stderr.on('data', (err) => console.error (err.toString()));
    activated = true;
}   

const pause = () => fs.writeFileSync('/home/pi/SEiri/node/youtube/control/command.txt', '0');

const play = (song) => {
    console.log("song:" + song)
    
    if(song !== undefined){
        switchSong(song);
    }
    else{
        fs.writeFileSync('/home/pi/SEiri/node/youtube/control/command.txt', '1');
    }
   
    if(!activated){
        activateMusic();
    }
}

const switchSong = (song) => fs.writeFileSync('/home/pi/SEiri/node/youtube/control/command.txt', '2 ' + song);

module.exports = {pause, play};