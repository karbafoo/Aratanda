import { ZDK, ZDKNetwork, ZDKChain } from "@zoralabs/zdk";
import fs from "fs";
import { spawn } from "child_process";
import axios from "axios";

const BASE_PYTHON = "./src/MediaProcessing";
const networkInfo = {
    network: ZDKNetwork.Ethereum,
    chain: ZDKChain.Mainnet,
};

const API_ENDPOINT = "https://api.zora.co/graphql";
const args = {
    endPoint: API_ENDPOINT,
    networks: [networkInfo],
    apiKey: process.env.API_KEY,
};
const zdk = new ZDK(args); // All arguments are optional

enum CHANNEL {
    Address,
    ID,
    Video,
    Audio,
    CropStart,
    Start,
    End,
    Top,
    Left,
    Right,
    Bottom,
}

export const CompileChannels = (channels: any[]) => {
    return new Promise(async (resolve, reject) => {
        try {
            const r = Math.floor(Math.random() * 1e10);
            const sc = sortByStart(channels);
            const metas = (
                await Promise.all(
                    sc.map((c) =>
                        c[CHANNEL.Address]
                            ? zdk.token({
                                  token: {
                                      address: c[CHANNEL.Address],
                                      tokenId: c[CHANNEL.ID],
                                  },
                              })
                            : null
                    )
                )
            ).map((t) => t?.token?.token);
            // console.log("metas", metas);
            const saved = await Promise.all(
                metas.map(
                    (m, i) =>
                        m &&
                        downloadStuff(
                            m.image?.mediaEncoding?.original || "",
                            getEx(m.image?.mimeType || "image/png"),
                            r.toString(),
                            i
                        )
                )
            );
            console.log("saved", saved);
            const vs = sc.map((c, i) =>
                c[CHANNEL.Video] && c[CHANNEL.Start] < c[CHANNEL.End] ? c : null
            );
            const vpaths = vs.map((v, i) => {
                if (v) {
                    const filename =
                        "media/" +
                        r +
                        "/" +
                        i +
                        "/" +
                        r +
                        "." +
                        getEx(metas[i]?.image?.mimeType || "image/png");
                    return filename;
                }
                return "";
            });
            const pvs = await Promise.all(
                vs.map((v, i) => {
                    if (v) {
                        return imageToVideo(
                            vpaths[i],
                            v[CHANNEL.Start] / 1e3,
                            v[CHANNEL.End] / 1e3
                        );
                    }
                    return null;
                })
            );
            console.log("pvs", pvs);
            // audio

            const as = sc.map((c, i) =>
                c[CHANNEL.Audio] && c[CHANNEL.Start] < c[CHANNEL.End] ? c : null
            );
            const apaths = as.map((a, i) => {
                if (a) {
                    const filename =
                        "media/" +
                        r +
                        "/" +
                        i +
                        "/" +
                        r +
                        "." +
                        getEx(
                            "video/mp4" ||
                                metas[i]?.image?.mimeType ||
                                "image/png"
                        );
                    return filename;
                }
                return "";
            });
            console.log("apaths[i]", apaths);
            const pas = await Promise.all(
                as.map((a, i) => {
                    if (a) {
                        return extractAudio(
                            apaths[i],
                            a[CHANNEL.Start] / 1e3,
                            a[CHANNEL.End] / 1e3
                        );
                    }
                    return null;
                })
            );
            console.log("pas", pas);
            await finishGigaNFT(r.toString());
            console.log("GIGA FINISHED");
            resolve({ name: r.toString() });
        } catch (err) {
            reject(err);
        }
    });
};

const sortByStart = (list: (any[] | null)[]): any[][] => {
    //@ts-ignore
    return (
        list
            .filter((a) => a != null)
            //@ts-ignore
            .sort((a, b) => a[CHANNEL.Start] - b[CHANNEL.Start])
    );
};

const imageToVideo = async (path: string, s: number, t: number) => {
    console.log("STARTPROCESS", path);
    const pythonProcess = spawn("python", [
        BASE_PYTHON + "/vprocessor.py",
        "image",
        path,
        s.toString(),
        t.toString(),
    ]);
    pythonProcess.stdout.on("data", (data) => {
        console.log("data", data.toString());
    });
    pythonProcess.stderr.on("data1", (data) => {
        console.log("error", data.toString());
    });
    await new Promise((resolve) => {
        pythonProcess.on("close", resolve);
    });
};
const extractAudio = async (path: string, s: number, t: number) => {
    console.log("STARTPROCESS", path);
    const pythonProcess = spawn("python", [
        BASE_PYTHON + "/aprocessor.py",
        "audio",
        path,
        s.toString(),
        t.toString(),
    ]);
    pythonProcess.stdout.on("data", (data) => {
        console.log("data", data.toString());
    });
    pythonProcess.stderr.on("data2", (data) => {
        console.log("error", data.toString());
    });
    await new Promise((resolve) => {
        pythonProcess.on("close", resolve);
    });
};
const finishGigaNFT = async (name: string) => {
    console.log("STARTPROCESS", name);
    const pythonProcess = spawn("python", [
        BASE_PYTHON + "/processor.py",
        "join",
        name,
    ]);
    pythonProcess.stdout.on("data", (data) => {
        console.log("data", data.toString());
    });
    pythonProcess.stderr.on("data", (data) => {
        console.log("error3", data.toString());
    });
    await new Promise((resolve) => {
        pythonProcess.on("close", resolve);
    });
};

const downloadStuff = (uri: string, ex: string, f: string, i: number) => {
    return new Promise(async (resolve, reject) => {
        console.log("uri", uri);
        axios({
            method: "get",
            url: uri,
            responseType: "stream",
        })
            .then((response) => {
                const filename = BASE_PYTHON + "/media/" + f + "/" + i;
                if (!fs.existsSync(filename)) {
                    fs.mkdirSync(filename, { recursive: true });
                }

                response.data
                    .pipe(fs.createWriteStream(filename + "/" + f + "." + ex))
                    .on("error", (err: any) => reject(err))
                    .on("close", () => resolve(filename + "/" + f + "." + ex));
            })
            .catch(reject);
    });
};

const getEx = (mime: string) => {
    return mime.startsWith("image")
        ? "png"
        : mime.startsWith("video")
        ? "mp4"
        : mime.startsWith("audio")
        ? "mp3"
        : "";
};
