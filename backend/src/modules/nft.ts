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
export const CompileChannels = (channels: any[]) => {
    return new Promise(async (resolve, reject) => {
        try {
            const r = Math.floor(Math.random() * 1e10);
            const metas = (
                await Promise.all(
                    channels.map((c) =>
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
            const vs = channels.map((c) =>
                c[CHANNEL.Video] ? [c[CHANNEL.Start], c[CHANNEL.End]] : null
            );
            const as = channels.map((c) =>
                c[CHANNEL.Audio] ? [c[CHANNEL.Start], c[CHANNEL.End]] : null
            );
        } catch (err) {
            reject(err);
        }
    });
};

const imageToVideo = (path: string, s: number, t: number) => {
    const pythonProcess = spawn("python", [
        BASE_PYTHON + "/vprocessor.py",
        "image",
        path,
        s.toString(),
        t.toString(),
    ]);
    pythonProcess.stdout.on("data", (data) => {
        // Do something with the data returned from python script
        console.log("data", data.toString());
    });
    pythonProcess.stderr.on("data", (data) => {
        // Do something with the data returned from python script
        console.log("error", data.toString());
    });
    console.log("ENDPROCESS");
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
                    .on("close", () => resolve(filename));
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
