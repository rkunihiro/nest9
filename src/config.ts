export interface Config {
    foo: string;
    bar: string;
}

export function config(): Config {
    return {
        foo: process.env["FOO"] ?? "",
        bar: process.env["BAR"] ?? "",
    };
}
