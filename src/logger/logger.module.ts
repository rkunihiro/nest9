import { randomUUID } from "node:crypto";

import { MiddlewareConsumer, Module, NestMiddleware, NestModule } from "@nestjs/common";

import { CustomLoggerService } from "./logger.service";
import { storage } from "./storage";

@Module({
    providers: [
        //
        CustomLoggerService,
    ],
})
export class LoggerModule implements NestMiddleware, NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerModule).forRoutes("*");
    }

    use(_req: unknown, _res: unknown, next: (error?: Error) => void) {
        const requestId = randomUUID();
        storage.run(requestId, next);
    }
}
