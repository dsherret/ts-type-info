import {ISymbolNode} from "./../../wrappers";
import {IDefinitionFactory} from "./../../factories";
import {DefinitionType} from "./../base";
import {BaseClassPropertyDefinition} from "./base";
import {ClassDefinition} from "./class-definition";

export class ClassStaticPropertyDefinition extends BaseClassPropertyDefinition {
    constructor(definitionFactory: IDefinitionFactory, symbolNode: ISymbolNode, parent: ClassDefinition) {
        super(definitionFactory, symbolNode, parent, DefinitionType.ClassStaticProperty);
    }
}
