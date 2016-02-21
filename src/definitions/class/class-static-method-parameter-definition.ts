import {ISymbolNode} from "./../../wrappers";
import {MainFactory} from "./../../factories";
import {DefinitionType} from "./../base";
import {BaseClassMethodParameterDefinition} from "./base";
import {ClassStaticMethodDefinition} from "./class-static-method-definition";

export class ClassStaticMethodParameterDefinition extends BaseClassMethodParameterDefinition<ClassStaticMethodDefinition> {
    constructor(mainFactory: MainFactory, symbolNode: ISymbolNode, parent: ClassStaticMethodDefinition) {
        super(mainFactory, symbolNode, parent, DefinitionType.ClassStaticMethodParameter);
    }
}
