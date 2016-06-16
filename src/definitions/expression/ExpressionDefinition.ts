import {DefinitionType} from "./../base";
import {BaseExpressionDefinition} from "./BaseExpressionDefinition";

export class ExpressionDefinition extends BaseExpressionDefinition {
    constructor() {
        super(DefinitionType.Expression);
    }
}
