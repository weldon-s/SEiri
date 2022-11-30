from deepspeech import Model
import wave
import numpy as np

model = Model('./deepspeech-0.9.3-models.tflite')
model.enableExternalScorer('./deepspeech-0.9.3-models.scorer')

audio_name = 'audio/2830-3980-0043.wav'

fin = wave.open(audio_name, 'rb')

audio = np.frombuffer(fin.readframes(fin.getnframes()), np.int16)
fin.close()

infered_text = model.stt(audio)

print(infered_text)
print('done')