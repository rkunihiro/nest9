import { Test } from "@nestjs/testing";

import { AppService } from "./app.service";

describe("AppService", () => {
    let appService: AppService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [AppService],
        }).compile();
        appService = moduleRef.get<AppService>(AppService);
    });

    it("getMessage", async () => {
        const message = await appService.getMessage();
        expect(message).toStrictEqual("Hello,World!");
    });
});
