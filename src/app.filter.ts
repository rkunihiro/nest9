import { ArgumentsHost, ExceptionFilter, Logger } from "@nestjs/common";

export class AppFilter implements ExceptionFilter {
    private readonly logger = new Logger(AppFilter.name);

    catch(exception: unknown, _host: ArgumentsHost) {
        this.logger.error(exception);
    }
}
