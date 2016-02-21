import {ISymbolNode} from "./../../wrappers";
import {MainCache} from "./../../utils";
import {DefinitionType} from "./../base";
import {BaseClassMethodParameterDefinition} from "./base";
import {ClassMethodDefinition} from "./class-method-definition";

export class ClassMethodParameterDefinition extends BaseClassMethodParameterDefinition<ClassMethodDefinition> {
    constructor(mainCache: MainCache, symbolNode: ISymbolNode, parent: ClassMethodDefinition) {
        super(mainCache, symbolNode, parent, DefinitionType.ClassMethodParameter);
    }
}
