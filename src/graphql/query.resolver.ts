import { UseInterceptors } from "@nestjs/common";
import { Query, Resolver } from "@nestjs/graphql";
import { GraphQLError } from "graphql";

import { CacheInterceptor } from "./cache.interceptor";
import { TodoType } from "./todo.type";

@Resolver("Query")
export class QueryResolver {
    @Query(() => String, {
        name: "message",
        description: "get message",
        nullable: false,
    })
    getMessage() {
        return "Hello,World!";
    }

    @Query(() => [TodoType], {
        name: "todos",
        description: "get todo list",
        nullable: true,
    })
    getTodos() {
        return [
            { id: 1, title: "foo", created: new Date("2022-10-01T15:04:05+09:00") },
            { id: 2, title: "bar", created: new Date("2022-10-02T12:00:00+09:00") },
        ];
    }

    @Query(() => String, {
        name: "now",
        description: "get current timestamp",
        nullable: false,
    })
    @UseInterceptors(CacheInterceptor)
    getNow() {
        return new Date().toISOString();
    }

    @Query(() => String, {
        name: "foo",
        nullable: true,
    })
    foo() {
        throw new GraphQLError("custom error message", {
            extensions: {
                code: 1234,
            },
        });
    }
}
