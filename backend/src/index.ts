import restApi from "./api";

const fastify = require("fastify")({
    logger: false,
});
fastify.register(require("@fastify/cors"), {
    // put your options here
});
fastify.register(restApi);

const PORT = process.env.PORT || 4442;

const HttpInit = async () => {
    return new Promise((resolve, reject) => {
        fastify.listen(PORT, "0.0.0.0", function (err: any, address: any) {
            if (err) {
                fastify.log.error(err);
                process.exit(1);
            }
            fastify.log.info(`server listening on ${address}`);
            resolve("1");
        });
    });
};

export const __MAIN__ = async () => {
    try {
        const server = await HttpInit();
        console.log("[i] Running a API server at", PORT);
    } catch (err) {
        console.error("FAILED TO INITIATE");
    }
};

__MAIN__();
