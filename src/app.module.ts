import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";

import { AppController } from "./app.controller";
import { AppFilter } from "./app.filter";
import { AppGuard } from "./app.guard";
import { AppInterceptor } from "./app.interceptor";
import { AppService } from "./app.service";
import { CacheModule } from "./cache/cache.module";
import { config } from "./config";
import { GraphqlModule } from "./graphql/graphql.module";
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
        GraphqlModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AppGuard,
        },
        {
            provide: APP_FILTER,
            useClass: AppFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: AppInterceptor,
        },

        AppService,
    ],
    controllers: [AppController],
})
export class AppModule {}
