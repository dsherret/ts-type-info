import {WrappedSymbolNode} from "./../../wrappers";
import {DefinitionType} from "./../base";
import {BaseClassMethodParameterDefinition} from "./base";
import {ClassStaticMethodDefinition} from "./class-static-method-definition";

export class ClassStaticMethodParameterDefinition extends BaseClassMethodParameterDefinition<ClassStaticMethodDefinition> {
    constructor(symbolNode: WrappedSymbolNode, parent: ClassStaticMethodDefinition) {
        super(symbolNode, parent, DefinitionType.ClassStaticMethodParameter);
    }
}
