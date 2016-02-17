import {WrappedSymbolNode} from "./../../wrappers";
import {ClassStaticMethodParameterStructure} from "./../../structures";
import {DefinitionType} from "./../base";
import {BaseClassMethodDefinition} from "./base";
import {ClassStaticMethodParameterDefinition} from "./class-static-method-parameter-definition";
import {ClassDefinition} from "./class-definition";

export class ClassStaticMethodDefinition extends BaseClassMethodDefinition<ClassStaticMethodParameterDefinition, ClassStaticMethodParameterStructure> {
    constructor(symbolNode: WrappedSymbolNode, parent: ClassDefinition) {
        super(symbolNode, ClassStaticMethodParameterDefinition, parent, DefinitionType.ClassStaticMethod);
    }
}
