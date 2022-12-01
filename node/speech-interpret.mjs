import {pause, play} from "./youtube/audiowrapper.js";
import { speak } from "./dsHelper.js";
import { generateResponse } from "./cannedresponse.js";

const interpret = (speech) => {
    if(speech === "pause"){
        pause();
        speak("music paused")
    }

    if(speech.startsWith("play")){
        if(speech === "play"){
            play();
        }

        console.log(speech.substring("play".length + 1))

        play(speech.substring("play".length + 1))
    }

    speak(generateResponse(speech))    
};

interpret("hello")