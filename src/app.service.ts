import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class AppService {
    private readonly logger = new Logger(AppService.name);

    /**
     * @returns greeting message
     */
    public async getMessage(): Promise<string> {
        this.logger.verbose("AppService#getMessage");
        return "Hello,World!";
    }
}
