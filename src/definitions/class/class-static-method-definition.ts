import {ISymbolNode} from "./../../wrappers";
import {MainFactory} from "./../../factories";
import {DefinitionType} from "./../base";
import {BaseClassMethodDefinition} from "./base";
import {ClassStaticMethodParameterDefinition} from "./class-static-method-parameter-definition";
import {ClassDefinition} from "./class-definition";

export class ClassStaticMethodDefinition extends BaseClassMethodDefinition<ClassStaticMethodParameterDefinition> {
    constructor(mainFactory: MainFactory, symbolNode: ISymbolNode, parent: ClassDefinition) {
        super(mainFactory, symbolNode, ClassStaticMethodParameterDefinition, parent, DefinitionType.ClassStaticMethod);
    }
}
