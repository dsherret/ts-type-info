import {BasePropertyDefinition} from "./../base/BasePropertyDefinition";
import {DefinitionType} from "./../base/DefinitionType";

export class TypePropertyDefinition extends BasePropertyDefinition {
    constructor() {
        super(DefinitionType.TypeProperty);
    }
}
