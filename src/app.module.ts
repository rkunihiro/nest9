import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoggerModule } from "./logger/logger.module";

@Module({
    imports: [
        //
        LoggerModule,
    ],
    providers: [AppService],
    controllers: [AppController],
})
export class AppModule {}
