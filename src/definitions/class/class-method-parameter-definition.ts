import {ISymbolNode} from "./../../wrappers";
import {IDefinitionFactory} from "./../../factories";
import {DefinitionType} from "./../base";
import {BaseClassMethodParameterDefinition} from "./base";
import {ClassMethodDefinition} from "./class-method-definition";

export class ClassMethodParameterDefinition extends BaseClassMethodParameterDefinition<ClassMethodDefinition> {
    constructor(definitionFactory: IDefinitionFactory, symbolNode: ISymbolNode, parent: ClassMethodDefinition) {
        super(definitionFactory, symbolNode, parent, DefinitionType.ClassMethodParameter);
    }
}
