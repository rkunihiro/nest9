import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CacheModule } from "./cache/cache.module";
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
        CacheModule,
    ],
    providers: [AppService],
    controllers: [AppController],
})
export class AppModule {}
