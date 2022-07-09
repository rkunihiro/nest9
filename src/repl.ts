import { repl } from "@nestjs/core";

import { AppModule } from "./app.module";

export async function main() {
    await repl(AppModule);
}
main();
