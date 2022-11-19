import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class AppInterceptor implements NestInterceptor {
    private readonly logger = new Logger(AppInterceptor.name);
    intercept(ec: ExecutionContext, next: CallHandler): Observable<any> {
        const handler = ec.getHandler().name;
        this.logger.log(`${handler} before`);
        return next.handle().pipe(
            tap(() => {
                this.logger.log(`${handler} after`);
            }),
        );
    }
}
