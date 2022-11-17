# windows - pip install pyttsx3 pypiwin32
# pip install pyttsx3 -- Linux
# install espeak somehow
import pyttsx3
import sys

# en_voice_id = "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Speech\Voices\Tokens\TTS_MS_EN-US_ZIRA_11.0"

# convert the txt file to a string
# with open('text.txt', 'r') as f:
#     lines = f.readlines()

# lines = [x.strip() for x in lines] # remove new line character
lines = sys.argv[1]

# One time initialization
engine = pyttsx3.init()

# Set properties _before_ you add things to say
engine.setProperty('rate', 200)    # Speed percent (can go over 100)
engine.setProperty('volume', 1)  # Volume 0-1
# engine.setProperty('voice', en_voice_id) # Female English voice

# Queue up things to say.
# There will be a short break between each one
# when spoken, like a pause between sentences.
engine.say(lines)

# Flush the say() queue and play the audio
engine.runAndWait()

# Program will not continue execution until
# all speech is done talking
