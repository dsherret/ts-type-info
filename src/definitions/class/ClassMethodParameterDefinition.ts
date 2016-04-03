import {DefinitionType} from "./../base";
import {BaseClassMethodParameterDefinition} from "./base";

export class ClassMethodParameterDefinition extends BaseClassMethodParameterDefinition {
    constructor() {
        super(DefinitionType.ClassMethodParameter);
    }
}
