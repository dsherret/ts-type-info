import {BaseDefinition, DefinitionType} from "./../base";

export class ExpressionDefinition extends BaseDefinition {
    constructor() {
        super(DefinitionType.Expression);
    }

    text: string;
}
