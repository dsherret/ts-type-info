import {DefinitionType} from "./../base";
import {BaseClassMethodParameterDefinition} from "./base";
import {ClassMethodDefinition} from "./ClassMethodDefinition";

export class ClassMethodParameterDefinition extends BaseClassMethodParameterDefinition<ClassMethodDefinition> {
    constructor() {
        super(DefinitionType.ClassMethodParameter);
    }
}
