import {StructureFactory} from "./../../factories";
import {TypeExpressionDefinition} from "./../expression";

export abstract class ReturnTypedDefinition {
    returnTypeExpression: TypeExpressionDefinition;

    setReturnTypeExpression(text: string) {
        this.returnTypeExpression = new StructureFactory().getTypeExpressionFromText(text);
        return this as any;
    }
}
