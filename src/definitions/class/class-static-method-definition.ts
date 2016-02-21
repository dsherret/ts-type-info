import {ISymbolNode} from "./../../wrappers";
import {MainCache} from "./../../utils";
import {DefinitionType} from "./../base";
import {BaseClassMethodDefinition} from "./base";
import {ClassStaticMethodParameterDefinition} from "./class-static-method-parameter-definition";
import {ClassDefinition} from "./class-definition";

export class ClassStaticMethodDefinition extends BaseClassMethodDefinition<ClassStaticMethodParameterDefinition> {
    constructor(mainCache: MainCache, symbolNode: ISymbolNode, parent: ClassDefinition) {
        super(mainCache, symbolNode, ClassStaticMethodParameterDefinition, parent, DefinitionType.ClassStaticMethod);
    }
}
