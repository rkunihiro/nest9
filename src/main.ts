import "reflect-metadata";

import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { CustomLoggerService } from "./logger/logger.service";

export async function main(port: number): Promise<void> {
    const app = await NestFactory.create(AppModule, {
        bufferLogs: true,
    });
    app.useLogger(app.get(CustomLoggerService));
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );
    app.listen(port);
}

if (require.main === module) {
    main(3000).catch((err) => {
        console.error(err);
        process.exit(1);
    });
}
