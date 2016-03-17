import {DefinitionType} from "./../base";
import {TypeDefinition} from "./../expressions";
import {BasePropertyDefinition} from "./../base/BasePropertyDefinition";

export class TypePropertyDefinition extends BasePropertyDefinition<TypeDefinition> {
    constructor() {
        super(DefinitionType.TypeProperty);
    }
}
