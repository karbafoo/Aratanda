import subprocess
import pathlib

basepath = f'"{pathlib.Path().resolve().as_posix()}"'


def joinAudioAndVideo(filename, ss=0, t=30):
    command = "ffmpeg -i video.mp4 -i audio.wav -c:v copy -c:a aac output.mp4"
    subprocess.call(command, shell=True)


# joinAudioAndVideo("test")
