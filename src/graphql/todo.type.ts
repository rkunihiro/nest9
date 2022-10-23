import { Field, ID, ObjectType } from "@nestjs/graphql";

import { DateTimeScalar } from "./datetime.scalar";

@ObjectType("Todo", {
    description: "description Todo type",
})
export class TodoType {
    @Field(() => ID, {
        name: "id",
        description: "todo ID",
        nullable: false,
    })
    id!: number;

    @Field(() => String, {
        name: "title",
        description: "todo title",
        nullable: false,
    })
    title!: string;

    @Field(() => DateTimeScalar, {
        name: "created",
        description: "created date",
        nullable: false,
    })
    created!: Date;
}
