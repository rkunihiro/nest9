import { CACHE_MANAGER, Inject, Injectable, Logger } from "@nestjs/common";
import { Cache } from "cache-manager";
// eslint-disable-next-line import/no-named-as-default
import Redis from "ioredis";

@Injectable()
export class CacheService {
    private readonly logger = new Logger(CacheService.name);

    constructor(
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
    ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const client = (this.cacheManager.store as any)?.getClient?.() as Redis;
        if (client) {
            client.on("connect", (...args: unknown[]) => {
                this.logger.debug("Redis connect", ...args);
            });
            client.on("reconnecting", (...args: unknown[]) => {
                this.logger.debug("Redis reconnecting", ...args);
            });
            client.on("error", (err) => {
                this.logger.warn("Redis error", err);
            });
        }
    }

    async get<T = unknown>(key: string): Promise<T | undefined> {
        try {
            const cache = await this.cacheManager.get<T>(key);
            if (cache) {
                this.logger.debug(`cache hit [${key}]`);
            } else {
                this.logger.debug(`cache miss [${key}]`);
            }
            return cache;
        } catch (err) {
            this.logger.warn(`cache get failed`, err);
            return;
        }
    }

    async set<T = unknown>(key: string, value: T, ttl: number): Promise<void> {
        try {
            await this.cacheManager.set<T>(key, value, { ttl });
            this.logger.debug(`cache saved  [${key}]`);
        } catch (err) {
            this.logger.warn(`cache save failed`, err);
        }
    }
}
