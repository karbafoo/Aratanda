import axios from "axios";

const BASE_URL = "http://localhost:4442/media/";
const HEADER = {
    Authorization: "TODO",
    "Content-Type": "application/json",
};
export const GET = <T>(route: string, params: any): Promise<T> => {
    return new Promise((resolve, reject) => {
        axios
            .get<any>(BASE_URL + route, {
                headers: HEADER,
                params: params,
            })
            .then((res) => {
                if (res && res.status === 200) {
                    console.log("GET request ", route, res);
                    if (res.data.success) {
                        resolve(res.data.data);
                    } else {
                        handleLocalError(res.data);
                    }
                } else {
                    reject(handleHttpError(res));
                }
            })
            .catch(handleHttpError);
    });
};

export const POST = <T>(route: string, body: any): Promise<T> => {
    return new Promise((resolve, reject) => {
        axios
            .post<any>(BASE_URL + route, body, {
                headers: { ...HEADER, method: "POST" },
            })
            .then((res) => {
                if (res && res.status === 200) {
                    console.log("POST request ", route, res);
                    if (res.data.success) {
                        resolve(res.data.data);
                    } else {
                        handleLocalError(res.data);
                    }
                } else {
                    reject(handleHttpError(res));
                }
            })
            .catch(handleHttpError);
    });
};

export const handleHttpError = (res: any) => {
    return new Error("ERRRRRRRR handler");
};
export const handleLocalError = (res: any) => {
    return new Error("ERRRRRRRR local handler");
};
