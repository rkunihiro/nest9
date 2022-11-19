import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AppGuard implements CanActivate {
    private readonly logger = new Logger(AppGuard.name);

    canActivate(ec: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const handler = ec.getHandler().name;
        this.logger.log(handler);
        return true;
    }
}
