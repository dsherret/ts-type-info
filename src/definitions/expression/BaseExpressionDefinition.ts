import {BaseDefinition, DefinitionType} from "./../base";

export class BaseExpressionDefinition extends BaseDefinition {
    constructor(type: DefinitionType) {
        super(type);
    }

    text: string;
}
