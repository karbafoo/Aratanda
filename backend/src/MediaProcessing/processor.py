import subprocess
import pathlib
import sys
import os
basepath = f'{pathlib.Path(__file__).parent.as_posix()}/media'


def joinAudioAndVideo(filename):
    op = f'"{basepath}/{filename}/output.mp4"'
    ap = f'"{basepath}/{filename}/a/{filename}.aac"'
    vp = f'"{basepath}/{filename}/v/{filename}.avi"'
    command = "ffmpeg -y -i "+vp + " -i " + ap + \
        " -c:v copy -c:a aac -c:v libx264 -f mp4 " + op
    subprocess.call(command, shell=True)


def outputVideo(filename):
    op = f'"{basepath}/{filename}/output.mp4"'
    vp = f'"{basepath}/{filename}/v/{filename}.avi"'
    command = "ffmpeg -y -i " + vp + \
        " -c:v copy -c:a aac -c:v libx264 -f mp4 " + op
    subprocess.call(command, shell=True)


if __name__ == '__main__':
    t = sys.argv[1]
    if t == "join":
        joinAudioAndVideo(sys.argv[2])
    elif t == "video":
        outputVideo(sys.argv[2])
