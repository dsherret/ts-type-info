import {DefinitionType} from "./../base";
import {BaseClassMethodParameterDefinition} from "./base";

export class ClassStaticMethodParameterDefinition extends BaseClassMethodParameterDefinition {
    constructor() {
        super(DefinitionType.ClassStaticMethodParameter);
    }
}
