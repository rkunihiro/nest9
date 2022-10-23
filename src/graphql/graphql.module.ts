import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule as NestGraphQLModule } from "@nestjs/graphql";

import { DateTimeScalar } from "./datetime.scalar";
import { QueryResolver } from "./query.resolver";

@Module({
    imports: [
        NestGraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: true,
            path: "/graphql",
            introspection: true,
            playground: process.env["NODE_ENV"] !== "production",
            debug: process.env["NODE_ENV"] !== "production",
        }),
    ],
    providers: [
        // scalar
        DateTimeScalar,
        // type
        // TodoType,
        // resolver
        QueryResolver,
    ],
})
export class GraphqlModule {}
