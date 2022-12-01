#button setup
from time import sleep
import board
from digitalio import DigitalInOut, Direction, Pull

button = DigitalInOut(board.D12)
button.direction = Direction.INPUT
button.pull = Pull.UP

#light setup
import adafruit_dotstar

DOTSTAR_DATA = board.D5
DOTSTAR_CLOCK = board.D6

dots = adafruit_dotstar.DotStar(DOTSTAR_CLOCK, DOTSTAR_DATA, 3, brightness=0.2)

def setColor(l, color):
    dots[l] = color

def setColors(color):
    dotValue = color
    for i in range(3):
        setColor(i, color)


dotValue = (0, 0, 0) # the singular color for when they're all the same
def lerpColor(color, steps):
    global dotValue
    for i in range(steps):
        for l in range(3):
            newColor = []
            for j in range(3):
                newColor.append(int(dotValue[j] + (color[j] - dotValue[j]) * i / steps))
            setColor(l, newColor)
        dots.show()
        sleep(0.01)
    dotValue = color

setColors((0, 0, 0))

#audio setup
import pyaudio
import wave
import audioop

FORMAT = pyaudio.paInt16
MAX_LENGTH = 20        # max number of seconds to record for
CHANNELS = 1           # Number of channels
BITRATE = 44100        # Audio Bitrate
# RATE_PROCESS=16000
RATE_PROCESS=16000
CHUNK_SIZE = 512       # Chunk size to 
WAVE_OUTPUT_FILENAME = "temp.wav"

#deepspeech setup
from deepspeech import Model
import wave
import numpy as np

#for the audio filtering
import matplotlib.pyplot as plt
import sys
import math
import contextlib

model = Model('/home/pi/SEiri/node/python/deepspeech-0.9.3-models.tflite')
model.enableExternalScorer('/home/pi/SEiri/node/python/deepspeech-0.9.3-models.scorer')

lerpColor((0, 100, 0), 50)

# wait for the button to be pressed
begun = False
while not begun:
    sleep(0.1)
    if not button.value:
        # print("Button pressed")
        begun = True
        # Record

# print("!pause")

recording_frames = []
audio = pyaudio.PyAudio()

# info = audio.get_host_api_info_by_index(0)
# numdevices = info.get('deviceCount')
# for i in range(0, numdevices):
#     if (audio.get_device_info_by_host_api_device_index(0, i).get('maxInputChannels')) > 0:
#         print("Input Device id ", i, " - ", audio.get_device_info_by_host_api_device_index(0, i).get('name'))

stream = audio.open(
    format=FORMAT,
    channels=CHANNELS,
    rate=RATE_PROCESS,
    input=True,
    # input_device_index = device_id,
    input_device_index = 2, #by inspection
    frames_per_buffer=CHUNK_SIZE
)

setColors((100, 0, 0))

i = 0
while not button.value and i < BITRATE/CHUNK_SIZE * MAX_LENGTH:
    data = stream.read(CHUNK_SIZE)
    recording_frames.append(data)
    i += 1

# print("processing")

lerpColor((100, 0, 100), 100)

stream.stop_stream()
stream.close()
audio.terminate()

waveFile = wave.open(WAVE_OUTPUT_FILENAME, 'wb')
waveFile.setnchannels(CHANNELS)
waveFile.setsampwidth(audio.get_sample_size(FORMAT))
waveFile.setframerate(RATE_PROCESS)
waveFile.writeframes(b''.join(recording_frames))
waveFile.close()

# print("!resume")

# all of this is from stackoverflow.com/questions/24820346/filtering-a-wav-file-using-python, and the respective references there
# hand-written tho, i'm not copy pasting anything from the internet
wavOutput = 'filtered.wav'

cutOffFrequency = 1000

#copied from somewhere, check stackoverflow
def running_mean(x, windowSize):
    cumsum = np.cumsum(np.insert(x,0,0)) #cum!?!?!?!?!??!?!?!??! SUS!???!?!?!?! WHY SDOES IT SAY CUM!?!?
    return(cumsum[windowSize:] - cumsum[:-windowSize])/windowSize

#damnit i thought i didn't need this, fine
def interpret_wav(raw_bytes, n_frames, n_channels, sample_width, interleaved=True):
    if sample_width == 1:
        dtype = np.uint8
    elif sample_width == 2:
        dtype = np.int16
    else:
        raise ValueError("i'm tired")

    channels = np.frombuffer(raw_bytes, dtype=dtype)

    if interleaved:
        channels.shape = (n_frames, n_channels)
        channels = channels.T
    else:
        console.log("ahaaahahahhaahhahahahahahahahahahah|")

    return channels

with contextlib.closing(wave.open(WAVE_OUTPUT_FILENAME, 'rb')) as spf:
    # i think we already have this data but oh well
    sampleRate = spf.getframerate()
    ampWidth = spf.getsampwidth()
    nChannels = 1 #ik this one for sure
    nFrames = spf.getnframes()

    signal = spf.readframes(nFrames)
    spf.close()
    channels = interpret_wav(signal,nFrames,nChannels,ampWidth,True)

    freqRatio = cutOffFrequency/sampleRate
    N = int(math.sqrt(0.196196 + freqRatio**2)/freqRatio) #no clue what this does haha, i'm barely awake still

    filtered = running_mean(channels[0], N).astype(np.int16)

    wav_file = wave.open(wavOutput, 'w')
    wav_file.setparams((1, ampWidth, sampleRate, nFrames, spf.getcomptype(), spf.getcompname()))
    wav_file.writeframes(filtered.tobytes('C'))
    wav_file.close()

# it looks like there might be a way to go right from the above audio stream into the deepspeech model, but it's 2 am and this should work
fin = wave.open(wavOutput, 'rb')

audio = np.frombuffer(fin.readframes(fin.getnframes()), np.int16)
fin.close()

infered_text = model.stt(audio)

print(">" + infered_text)
lerpColor((0, 0, 0), 150)