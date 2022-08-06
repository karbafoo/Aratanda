import MediaApi from "./media.api";

async function routes(fastify: any, options: any) {
    fastify.register(MediaApi, { prefix: "/media" });
}

export default routes;
