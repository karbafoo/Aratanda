import subprocess
import pathlib

basepath = f'"{pathlib.Path().resolve().as_posix()}"'


def seperateAudio(filename, ss=0, t=30):
    command = "ffmpeg -y -i " + basepath + "/"+filename+".mp4" + \
        " -c:a aac -ab 160k -ac 2 -ar 44100 -ss " + \
        str(ss) + " -t " + str(t) + " -vn " + "test"+".aac"
    subprocess.call(command, shell=True)


seperateAudio("test")
