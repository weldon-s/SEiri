import urllib.request
import re
import webbrowser
from pytube import YouTube
import vlc
import time
import os

SEARCH_STRING = "https://www.youtube.com/results?search_query="
VIDEO_STRING = "https://www.youtube.com/"
EXTENSION = "mp4"
AUDIO_PATH = "node/youtube/audio"
CONTROL_PATH = "node/youtube/control"

def fetchAudio(input):
    content = urllib.request.urlopen(SEARCH_STRING + input.replace(" ", "_"))
    suffix = re.findall(r"(watch\?v=\S{11})", content.read().decode())[0]
    video = YouTube(VIDEO_STRING + suffix)
    stream = video.streams.filter(only_audio=True, file_extension=EXTENSION)[0]

    stream.download(AUDIO_PATH, input + "." + EXTENSION)
    

    #webbrowser.open(VIDEO_STRING + suffix) 
    #could we include a tts call here? ("opening *video title*")


def getMedia(song):
    return vlc.MediaPlayer(AUDIO_PATH + "/" + song + "." + EXTENSION)

def getCommandText():
    return open(CONTROL_PATH + "/command.txt").read()

media = None
currentSong = None

songList = os.listdir(AUDIO_PATH)

#0 for pause, 1 for play, 2 for selecting new song
while True:
    text = getCommandText()

    if len(text) <= 0:
        continue

    if text[0] == '0' and media != None:
        media.pause()

        while(getCommandText() == '0'):
            time.sleep(0.1)

    if text[0] == '1' and media != None:
        media.play()

    if text[0] == '2' and len(text) > 2:
        nextSong = text[2:]

        if not((nextSong + "." + EXTENSION) in songList):
            fetchAudio(nextSong)
            songList = os.listdir(AUDIO_PATH)

        if currentSong != nextSong:
            if media != None:
                media.stop()

            media = getMedia(nextSong)
            media.play()
            currentSong = nextSong

    time.sleep(0.1)