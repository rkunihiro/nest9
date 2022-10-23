import { CacheModule as NestCacheModule, Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import redisStore from "cache-manager-ioredis";
// eslint-disable-next-line import/no-named-as-default
import Redis, { Cluster } from "ioredis";

import { CacheService } from "./cache.service";

@Global()
@Module({
    imports: [
        NestCacheModule.registerAsync<{ redisInstance: Redis | Cluster }>({
            imports: [ConfigModule],
            inject: [ConfigService],
            isGlobal: true,
            useFactory: async (config: ConfigService) => {
                const url = config.get<string>("redis.url") as string;
                const redisInstance = new Redis(url, {
                    commandTimeout: 100,
                    reconnectOnError: () => false,
                    retryStrategy(times) {
                        return Math.min(times * 2000, 20000);
                    },
                });
                return {
                    store: redisStore,
                    redisInstance,
                };
            },
        }),
    ],
    providers: [CacheService],
    exports: [CacheService],
})
export class CacheModule {}
