import pyttsx3
import sys
engine = pyttsx3.init()
# arr=sys.argv[1]
# engine.say("hi this is me kapil chauhan")
# print(l)
# c=open("text.mp3",mode='w')
# engine.runAndWait()
# print(sys.argv[1])

# import pyttsx3
# engine = pyttsx3.init() # object creation

# """ RATE"""
# rate = engine.getProperty('rate')   # getting details of current speaking rate
# print (rate)                        #printing current voice rate
engine.setProperty('rate', 100)     # setting up new voice rate


# """VOLUME"""
# volume = engine.getProperty('volume')   #getting to know current volume level (min=0 and max=1)
# print (volume)                          #printing current volume level
# engine.setProperty('volume',0.5)    # setting up volume level  between 0 and 1

# """VOICE"""
# voices = engine.getProperty('voices')       #getting details of current voice
# #engine.setProperty('voice', voices[0].id)  #changing index, changes voices. o for male
# engine.setProperty('voice', voices[1].id)   #changing index, changes voices. 1 for female

# engine.say("Hello World!")
# engine.say('My current speaking rate is ' + str(rate))
# engine.runAndWait()


"""Saving Voice to a file"""
#On linux make sure that 'espeak' and 'ffmpeg' are installed
print("working")
engine.save_to_file(sys.argv[1], './Audio/test.mp3')
engine.runAndWait()

engine.stop()