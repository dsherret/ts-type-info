import {ISymbolNode} from "./../../wrappers";
import {MainCache} from "./../../utils";
import {DefinitionType} from "./../base";
import {BaseClassMethodParameterDefinition} from "./base";
import {ClassStaticMethodDefinition} from "./class-static-method-definition";

export class ClassStaticMethodParameterDefinition extends BaseClassMethodParameterDefinition<ClassStaticMethodDefinition> {
    constructor(mainCache: MainCache, symbolNode: ISymbolNode, parent: ClassStaticMethodDefinition) {
        super(mainCache, symbolNode, parent, DefinitionType.ClassStaticMethodParameter);
    }
}
