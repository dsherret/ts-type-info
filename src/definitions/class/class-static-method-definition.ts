import {WrappedSymbolNode} from "./../../wrappers";
import {DefinitionType} from "./../base";
import {BaseClassMethodDefinition} from "./base";
import {ClassStaticMethodParameterDefinition} from "./class-static-method-parameter-definition";
import {ClassDefinition} from "./class-definition";

export class ClassStaticMethodDefinition extends BaseClassMethodDefinition<ClassStaticMethodParameterDefinition> {
    constructor(symbolNode: WrappedSymbolNode, parent: ClassDefinition) {
        super(symbolNode, ClassStaticMethodParameterDefinition, parent, DefinitionType.ClassStaticMethod);
    }
}
