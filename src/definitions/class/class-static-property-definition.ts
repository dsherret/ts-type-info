import {ISymbolNode} from "./../../wrappers";
import {MainFactory} from "./../../factories";
import {DefinitionType} from "./../base";
import {BaseClassPropertyDefinition} from "./base";
import {ClassDefinition} from "./class-definition";

export class ClassStaticPropertyDefinition extends BaseClassPropertyDefinition {
    constructor(mainFactory: MainFactory, symbolNode: ISymbolNode, parent: ClassDefinition) {
        super(mainFactory, symbolNode, parent, DefinitionType.ClassStaticProperty);
    }
}
