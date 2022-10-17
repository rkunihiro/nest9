import { CacheModule, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
// eslint-disable-next-line import/no-named-as-default
import redisStore from "cache-manager-ioredis";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { config } from "./config";
import { LoggerModule } from "./logger/logger.module";

@Module({
    imports: [
        //
        ConfigModule.forRoot({
            cache: true,
            isGlobal: true,
            envFilePath: [".env"],
            load: [config],
        }),

        LoggerModule,

        CacheModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            isGlobal: true,
            useFactory: async (config: ConfigService) => {
                return {
                    store: redisStore,
                    url: config.get<string>("redis.url") as string,
                };
            },
        }),
    ],
    providers: [AppService],
    controllers: [AppController],
})
export class AppModule {}
