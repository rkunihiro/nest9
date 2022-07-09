import { resolve } from "node:path";

import { analyzeMetafileSync, BuildOptions, buildSync } from "esbuild";

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
    external: [
        // TODO: 以後dependenciesに追加したものを以下から削除します
        "@nestjs/microservices",
        "@nestjs/websockets",
        "cache-manager",
        "class-transformer",
        "class-validator",
        "fsevents",
    ],
};

try {
    const { metafile } = buildSync(options);
    if (metafile) {
        const detail = analyzeMetafileSync(metafile);
        console.log(detail);
    }
} catch (err) {
    console.error(err);
    process.exit(1);
}
