import { Controller, Get, Inject } from "@nestjs/common";

import { AppService } from "./app.service";

@Controller("/")
export class AppController {
    constructor(
        @Inject(AppService)
        private readonly appService: AppService,
    ) {}

    @Get("/")
    public async index() {
        return await this.appService.getMessage();
    }
}
