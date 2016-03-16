import {DefinitionType} from "./../base";
import {BaseClassPropertyDefinition} from "./base";

export class ClassPropertyDefinition extends BaseClassPropertyDefinition {
    isAccessor: boolean;
    isReadonly: boolean;
    isConstructorParameter: boolean;

    constructor() {
        super(DefinitionType.ClassProperty);
    }
}
