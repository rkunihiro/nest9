import { Injectable, LoggerService, LogLevel } from "@nestjs/common";

import { storage } from "./storage";

@Injectable()
export class CustomLoggerService implements LoggerService {
    private format(level: LogLevel, ...args: unknown[]): string {
        const message = args.shift();
        const context = args.pop();
        const requestId = storage.getStore();
        return JSON.stringify({
            time: new Date().getTime() / 1000,
            level: level === "log" ? "info" : level,
            context,
            message,
            params: args.length === 0 ? undefined : args.length > 1 ? args : args[0],
            requestId,
        });
    }

    debug(...args: unknown[]) {
        console.debug(this.format("debug", ...args));
    }

    verbose(...args: unknown[]) {
        console.debug(this.format("verbose", ...args));
    }

    log(...args: unknown[]) {
        console.log(this.format("log", ...args));
    }

    warn(...args: unknown[]) {
        console.warn(this.format("warn", ...args));
    }

    error(...args: unknown[]) {
        console.error(this.format("error", ...args));
    }
}
