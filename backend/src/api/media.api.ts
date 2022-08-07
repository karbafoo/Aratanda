import { CompileChannels } from "../modules/nft";
import HttpHandler from "./helper";

async function routes(fastify: any, options: any) {
    fastify.route({
        method: "POST",
        url: "/compile",
        handler: CompileGigaNFT,
    });
}

export default routes;

const CompileGigaNFT = async (request: any, reply: any) => {
    try {
        console.log("COMPILE", request.body);
        try {
            const res = await CompileChannels(request.body?.channels);
            HttpHandler.sendResponse(reply, res);
        } catch (err) {
            HttpHandler.sendError(reply, err);
        }
    } catch (err) {
        HttpHandler.sendError(reply, err);
    }
};
