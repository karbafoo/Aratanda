import cv2
import numpy as np
import sys
import os
import pathlib
frame_width = 1024
frame_height = 768

fourcc = cv2.VideoWriter_fourcc('M', 'J', 'P', 'G')
basepath = f'{pathlib.Path(__file__).parent.as_posix()}'


def resizeToMax(img):
    blank_image = np.zeros((frame_height, frame_width, 3), np.uint8)
    h, w = img.shape[:2]
    aspect = w/h
    scaled_img = cv2.resize(img, (int(frame_height*aspect), frame_height),
                            interpolation=cv2.INTER_AREA)
    nh, nw = scaled_img.shape[:2]
    x_offset = int(np.abs(frame_width-nw)/2)
    y_offset = int(np.abs(frame_height-nh)/2)

    blank_image[y_offset:y_offset+nh,
                x_offset:x_offset+nw] = scaled_img
    return blank_image


def createVideoFromImage(pathToFile, ss=0, t=30):
    if len(pathToFile) < 1:
        raise ValueError('Path required')
    name = pathToFile.split(".")[0].split("/")[1]
    pathToFile = basepath + "/" + pathToFile
    d = t - ss
    img = cv2.imread(pathToFile)
    sImg = resizeToMax(img)

    dir = f"{basepath}/media/{name}/v/"
    if not os.path.exists(dir):
        os.makedirs(dir)
    out = cv2.VideoWriter(
        f"{dir}{name}-{ss}-{t}.avi", fourcc, 1 / d, (frame_width, frame_height))
    out.write(sImg)
    out.release()


def seperateVideo(pathToFile, ss=0, t=30):
    if len(pathToFile) < 1:
        raise ValueError('Path required')
    name = pathToFile.split(".")[0].split("/")[1]
    pathToFile = basepath + "/" + pathToFile
    v = cv2.VideoCapture(pathToFile)
    fps = v.get(cv2.CAP_PROP_FPS)
    count = int(v.get(cv2.CAP_PROP_FRAME_COUNT))
    d = t - ss

    dir = f"{basepath}/media/{name}/v/"
    if not os.path.exists(dir):
        os.makedirs(dir)
    out = cv2.VideoWriter(f"{dir}sep-{name}-{ss}-{t}.avi",
                          fourcc, fps, (frame_width, frame_height))
    st = ss * fps
    end = t * fps
    end = end if end < count else count
    i = 0
    success, img = v.read()
    sImg = img
    while success:
        if i > st and i <= end:
            sImg = resizeToMax(img)
            out.write(sImg)
        success, img = v.read()
        i += 1
    if t * fps > end:
        while i < t * fps:
            out.write(sImg)
            i += 1
    out.release()


# createVideoFromImage('test.png')
# seperateVideo("v.mp4", 4)

if __name__ == '__main__':
    t = sys.argv[1]
    if t == "image":
        createVideoFromImage(sys.argv[2], int(sys.argv[3]), int(sys.argv[4]))
    elif t == "video":
        seperateVideo(sys.argv[2], int(sys.argv[3]), int(sys.argv[4]))
