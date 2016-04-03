import {BasePropertyDefinition, DefinitionType} from "./../base";

export class InterfacePropertyDefinition extends BasePropertyDefinition {
    constructor() {
        super(DefinitionType.InterfaceProperty);
    }
}
