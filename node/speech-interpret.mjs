import {pause, play} from "./youtube/audiowrapper.js";
import { speak } from "./dsHelper.js";
import { generateResponse } from "./cannedresponse.js";

const interpret = (speech) => {
    if(speech === "pause"){
        pause();
    }

    if(speech.startsWith("play")){
        if(speech === "play"){
            play();
        }

        play(speech.substring("play".length + 1))
    }

    speak(generateResponse(speech))    
};