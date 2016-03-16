import {BasePropertyDefinition, DefinitionType} from "./../base";
import {InterfaceDefinition} from "./InterfaceDefinition";

export class InterfacePropertyDefinition extends BasePropertyDefinition<InterfaceDefinition> {
    constructor() {
        super(DefinitionType.InterfaceProperty);
    }
}
