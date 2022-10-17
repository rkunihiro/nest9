export interface Config {
    foo: string;
    bar: string;
    redis: { url: string };
}

export function config(): Config {
    return {
        foo: process.env["FOO"] ?? "",
        bar: process.env["BAR"] ?? "",
        redis: {
            url: process.env["REDIS_URL"] ?? "",
        },
    };
}
