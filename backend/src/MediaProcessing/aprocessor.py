import subprocess
import pathlib
import sys
import os
basepath = f'{pathlib.Path(__file__).parent.as_posix()}'


def seperateAudio(filename, ss=0, t=30):
    d = f'"{basepath}/{filename}"'
    dd = f'{basepath}/{filename}'
    name = filename.split("/")[1]
    dir = "/".join(dd.split("/")[:-2])
    dir = f'{dir}/a'
    if not os.path.exists(dir):
        os.makedirs(dir)
    ff = f'"{dir}/{name}.aac"'
    command = "ffmpeg -y -i " + d + \
        " -c:a aac -ab 160k -ac 2 -ar 44100 -ss " + \
        str(ss) + " -t " + str(t) + " -vn " + ff
    subprocess.call(command, shell=True)


# seperateAudio("test")

if __name__ == '__main__':
    seperateAudio(sys.argv[2], int(sys.argv[3]), int(sys.argv[4]))
