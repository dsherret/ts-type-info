import {MainFactory} from "./../../factories";
import {ExpressionDefinition} from "./../expression";

export abstract class DefaultExpressionedDefinition {
    defaultExpression: ExpressionDefinition | null;

    setDefaultExpression(text: string) {
        this.defaultExpression = new MainFactory().createStructureFactory().getTypeFromText(text);
        return this;
    }
}
