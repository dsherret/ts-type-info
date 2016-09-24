import {DefinitionType} from "./../base";
import {BaseExpressionDefinition} from "./base";

export class ExpressionDefinition extends BaseExpressionDefinition {
    constructor() {
        super(DefinitionType.Expression);
    }
}
