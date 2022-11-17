const bot = require('./cannedresponse.js');
const spawn = require('child_process').spawn;

const toTTS = (...text) => {
    const args = ['./pyttsx3-texttospeech/textToSpeech.py', ...text];
    const tts = spawn('python', args);
}

const sendResponseToTTS = (input) => toTTS(bot.generateResponse(input));