import {ISymbolNode} from "./../../wrappers";
import {MainFactory} from "./../../factories";
import {DefinitionType} from "./../base";
import {BaseClassMethodParameterDefinition} from "./base";
import {ClassMethodDefinition} from "./class-method-definition";

export class ClassMethodParameterDefinition extends BaseClassMethodParameterDefinition<ClassMethodDefinition> {
    constructor(mainFactory: MainFactory, symbolNode: ISymbolNode, parent: ClassMethodDefinition) {
        super(mainFactory, symbolNode, parent, DefinitionType.ClassMethodParameter);
    }
}
