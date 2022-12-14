import os
from pytube import YouTube
import re
import time
import urllib.request
import vlc


SEARCH_STRING = "https://www.youtube.com/results?search_query="
VIDEO_STRING = "https://www.youtube.com/"
EXTENSION = "mp4"
AUDIO_PATH = "/home/pi/SEiri/node/youtube/audio"
CONTROL_PATH = "/home/pi/SEiri/node/youtube/control"
MAX_SONGS = 20
print("audio process begun")

def fetchAudio(input):
    print("fetching " + input)

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
sorted(songList, key = lambda path: os.path.getmtime(AUDIO_PATH + "/" + path))


#0 for pause, 1 for play, 2 for selecting new song
for i in range(600): #for testing, stop after a minute 
    print("audio running")
    text = getCommandText()

    if len(text) <= 0:
        continue

    if text[0] == '0' and media != None:
        media.pause()

        while(getCommandText() == '0'):
            time.sleep(1)

    if text[0] == '1' and media != None:
        media.play()

    if text[0] == '2' and len(text) > 2:
        nextSong = text[2:]

        if not((nextSong + "." + EXTENSION) in songList):
            fetchAudio(nextSong)
            songList = os.listdir(AUDIO_PATH)

            if(len(songList) > MAX_SONGS):
                os.remove(AUDIO_PATH + "/" + songList[0])
                songList = os.listdir(AUDIO_PATH)


        if currentSong != nextSong:
            if media != None:
                media.stop()

            media = getMedia(nextSong)
            media.play()
            currentSong = nextSong

    time.sleep(0.5)