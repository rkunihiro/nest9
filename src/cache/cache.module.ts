import { CacheModule as NestCacheModule, Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import redisStore from "cache-manager-ioredis";
import { RedisOptions } from "ioredis";

import { CacheService } from "./cache.service";

@Global()
@Module({
    imports: [
        NestCacheModule.registerAsync<RedisOptions>({
            imports: [ConfigModule],
            inject: [ConfigService],
            isGlobal: true,
            useFactory: async (config: ConfigService) => {
                return {
                    store: redisStore,
                    url: config.get<string>("redis.url") as string,
                    commandTimeout: 100,
                    reconnectOnError: () => false,
                    retryStrategy(times) {
                        return Math.min(times * 2000, 20000);
                    },
                };
            },
        }),
    ],
    providers: [CacheService],
    exports: [CacheService],
})
export class CacheModule {}
