import { createHash } from "node:crypto";
import { setTimeout } from "node:timers/promises";

import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { GqlContextType, GqlExecutionContext } from "@nestjs/graphql";
import { GraphQLResolveInfo } from "graphql";
import { Observable, of, tap } from "rxjs";

import { CacheService } from "../cache/cache.service";

@Injectable()
export class CacheInterceptor implements NestInterceptor {
    constructor(
        @Inject(CacheService)
        private readonly cacheService: CacheService,
    ) {}

    async intercept(ec: ExecutionContext, next: CallHandler): Promise<Observable<unknown>> {
        if (ec.getType<GqlContextType>() !== "graphql") {
            return next.handle();
        }

        const gec = GqlExecutionContext.create(ec);
        const info = gec.getInfo<GraphQLResolveInfo>();
        if (info.path.typename !== "Query") {
            return next.handle();
        }
        const args = gec.getArgs();
        const cacheKey = this.cacheKey(info, args);

        const cache = await this.getCache(cacheKey);
        if (cache) {
            // return from cache
            return of(cache);
        }

        return next.handle().pipe(
            tap((result: unknown) => {
                // save result to cache
                this.cacheService.set(cacheKey, result, 60);
                return result;
            }),
        );
    }

    cacheKey(info: GraphQLResolveInfo, args: Record<string, unknown>) {
        const time = Math.floor(Date.now() / 60000) * 60;
        const hash = createHash("sha256").update(JSON.stringify(args)).digest("base64");
        return `resolver:${info.fieldName}#${hash};${time}`;
    }

    async getCache(key: string) {
        const cache = await this.cacheService.get<unknown>(key);
        if (cache) {
            return cache;
        }
        // Retry after random sleep 0-300ms
        await setTimeout(Math.floor(Math.random() * 300));
        return this.cacheService.get<unknown>(key);
    }
}
