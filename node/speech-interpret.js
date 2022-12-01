// import {pause, play} from "./youtube/audiowrapper.js";
// import { speak } from "./dsHelper.js";
// import { generateResponse } from "./cannedresponse.js";
// import {send} from "./index.js";
const {pause, play} = require("./youtube/audiowrapper.js");
const { speak } = require("./pythonHelper.js");
const { generateResponse } = require("./cannedresponse.js");

function send(message, client) {
    if (client.activeGuild && client.activeChannel) {
        return client.guilds.fetch(client.activeGuild)
        .then(guild => {
            guild.channels.fetch(client.activeChannel)
            .then(channel  => {
                channel.send(message)
                .catch(err => console.error(err)); // i'm not sure if having multiple is helpful, or if the outer catches the inner, but i'm going to leave it like this cause why not
            }).catch(err => console.error(err));
        }).catch(err => console.error(err));
    } else {
        return false;
    }
}

const interpret = (speech, client) => {
    if(speech === "pause"){
        return pause();
    }

    // catches resume music, resume my song etc
    if(speech.startsWith("resume")) {
        return play();
    }

    for (string of ["send", "reply", "replied"]) {
        if (speech.startsWith(string)) {
            return send(speech.substring(string.length+1), client); // id like to hard code this but weldon didn't so whatever
        }
    }

    for (string of ["play", "listen to", "put on"]) {
        if(speech.startsWith(string)){
            if(speech === string){
                return play();
            } else {
                return play(speech.substring(string.length + 1))
            }
        }
    }

    speak(generateResponse(speech));
};

module.exports = {interpret}