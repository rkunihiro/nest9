import { CustomScalar, Scalar } from "@nestjs/graphql";
import { ASTNode, Kind } from "graphql";

@Scalar("DateTime")
export class DateTimeScalar implements CustomScalar<string, Date> {
    description = "Datetime";

    parseValue(value: unknown): Date {
        if (typeof value === "string") {
            return new Date(value);
        }
        throw new Error(`parseValue failed ${JSON.stringify({ value })}`);
    }

    parseLiteral(ast: ASTNode): Date {
        if (ast.kind === Kind.STRING) {
            return new Date(ast.value);
        }
        throw new Error(`parseLiteral failed ${JSON.stringify({ ast })}`);
    }

    serialize(value: unknown): string {
        if (value instanceof Date) {
            return value.toString();
        }
        return "";
    }
}
