import {StructureFactory} from "./../../factories";
import {ExpressionDefinition} from "./../expression";

export abstract class DefaultExpressionedDefinition {
    defaultExpression: ExpressionDefinition;

    setDefaultExpression(text: string) {
        this.defaultExpression = new StructureFactory().getTypeExpressionFromText(text);
        return this as any;
    }
}
