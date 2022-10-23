import { CustomScalar, Scalar } from "@nestjs/graphql";
import { ASTNode, Kind } from "graphql";

@Scalar("DateTime")
export class DateTimeScalar implements CustomScalar<string, Date> {
    description = "Datetime";

    parseValue(value: unknown): Date | undefined {
        if (typeof value === "string") {
            return new Date(value);
        }
        return undefined;
    }

    parseLiteral(ast: ASTNode): Date | undefined {
        if (ast.kind === Kind.STRING) {
            return new Date(ast.value);
        }
        return undefined;
    }

    serialize(value: Date): string {
        return value.toString();
    }
}
