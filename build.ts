import { resolve } from "node:path";

import { analyzeMetafile, build, BuildOptions } from "esbuild";
import esbuildPluginTsc from "esbuild-plugin-tsc";

const options: BuildOptions = {
    entryPoints: {
        main: resolve(__dirname, "./src/main.ts"),
    },
    outdir: resolve(__dirname, "./dist"),
    tsconfig: resolve(__dirname, "./tsconfig.build.json"),

    bundle: true,
    minify: true,
    keepNames: true,
    sourcemap: true,
    metafile: true,

    format: "cjs",
    platform: "node",
    target: "node16",
    define: {
        "process.env.NODE_ENV": '"production"',
    },
    plugins: [esbuildPluginTsc()],
    external: [
        // TODO: 以後dependenciesに追加したものを以下から削除します
        "@apollo/gateway",
        "@apollo/subgraph",
        "@nestjs/microservices",
        "@nestjs/websockets",
        "apollo-server-fastify",
        "class-transformer/storage",
        "fsevents",
        "ts-morph",
    ],
};

async function main(): Promise<void> {
    try {
        const { metafile } = await build(options);
        if (metafile) {
            const detail = await analyzeMetafile(metafile);
            console.log(detail);
        }
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
main();
