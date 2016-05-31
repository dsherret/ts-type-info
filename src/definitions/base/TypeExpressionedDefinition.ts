import {StructureFactory} from "./../../factories";
import {TypeExpressionDefinition} from "./../expression";

export abstract class TypeExpressionedDefinition {
    typeExpression: TypeExpressionDefinition;

    setTypeExpression(text: string) {
        this.typeExpression = new StructureFactory().getTypeExpressionFromText(text);
        return this;
    }
}
