import {WrappedSymbolNode} from "./../../wrappers";
import {DefinitionType} from "./../base";
import {BaseClassMethodParameterDefinition} from "./base";
import {ClassMethodDefinition} from "./class-method-definition";

export class ClassMethodParameterDefinition extends BaseClassMethodParameterDefinition<ClassMethodDefinition> {
    constructor(symbolNode: WrappedSymbolNode, parent: ClassMethodDefinition) {
        super(symbolNode, parent, DefinitionType.ClassMethodParameter);
    }
}
