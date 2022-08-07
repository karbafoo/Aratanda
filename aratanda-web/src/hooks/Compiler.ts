import { POST } from "../util/http";

export const GetCompile = (channels: any[]): Promise<any> => {
    return new Promise((resolve, reject) => {
        POST<any>("compile", { channels })
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
