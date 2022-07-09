import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

export async function main(port: number): Promise<void> {
    const app = await NestFactory.create(AppModule, {});
    app.listen(port);
}

if (require.main === module) {
    main(3000).catch((err) => {
        console.error(err);
        process.exit(1);
    });
}
