import { Controller, Get, Inject, Logger } from "@nestjs/common";

import { AppService } from "./app.service";
import { CacheService } from "./cache/cache.service";

@Controller("/")
export class AppController {
    private readonly logger = new Logger(AppController.name);

    constructor(
        @Inject(AppService)
        private readonly appService: AppService,
        @Inject(CacheService)
        private readonly cacheService: CacheService,
    ) {}

    @Get("/")
    public async index() {
        this.logger.verbose("AppController#index");
        return await this.appService.getMessage();
    }

    @Get("/now")
    public async now() {
        const key = "now";
        const cache = await this.cacheService.get(key);
        if (cache) {
            return cache;
        }
        const now = new Date().toISOString();
        this.cacheService.set(key, now, 60);
        return now;
    }
}
