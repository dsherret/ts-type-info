import {DefinitionType} from "./../base";
import {BaseClassPropertyDefinition} from "./base";

export class ClassStaticPropertyDefinition extends BaseClassPropertyDefinition {
    constructor() {
        super(DefinitionType.ClassStaticProperty);
    }
}
