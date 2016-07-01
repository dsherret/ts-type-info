import {BasePropertyDefinition, DefinitionType} from "./../base";

export class InterfacePropertyDefinition extends BasePropertyDefinition {
    // tslint:disable-next-line:no-unused-variable
    private _interfacePropertyBrand: string; // to make structural typing happy

    constructor() {
        super(DefinitionType.InterfaceProperty);
    }
}
