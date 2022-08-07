const path = require("path");
const fs = require("fs");
const sendFile = (reply: any, data: any) => {
    const buffer = fs.readFileSync(path.join(__dirname, data));
    reply.type("video/mp4"); // if you don't set the content, the image would be downloaded by browser instead of viewed
    reply.send(buffer);
};
const sendResponse = (reply: any, data: any) => {
    reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({ data: data, success: true });
};

const sendError = (reply: any, err: any) => {
    //TODO
    console.log("sendError", err);
    if (err) {
        if (err.self) {
            reply
                .code(406)
                .header("Content-Type", "application/json; charset=utf-8")
                .send({ msg: err.msg });
            return;
        } else if (err.name === "CastError") {
            reply
                .code(406)
                .send({ code: err.code || "4066", msg: "WEIRD_ERROR" });
            return;
        }
    }

    reply.code(417).send({ code: err.code || "0", msg: err.msg || "ERROR" });
};

export default {
    sendFile,
    sendResponse,
    sendError,
};
