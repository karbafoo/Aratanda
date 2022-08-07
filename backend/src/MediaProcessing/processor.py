import subprocess
import pathlib
import sys
import os
basepath = f'{pathlib.Path(__file__).parent.as_posix()}/media'


def joinAudioAndVideo(filename):
    op = f'"{basepath}/{filename}/output.mp4"'
    ap = f'"{basepath}/{filename}/a/{filename}.aac"'
    vp = f'"{basepath}/{filename}/v/{filename}.avi"'
    command = "ffmpeg -y -i "+vp+" -i "+ap+" -c:v copy -c:a aac "+op
    subprocess.call(command, shell=True)


if __name__ == '__main__':
    joinAudioAndVideo(sys.argv[2])
