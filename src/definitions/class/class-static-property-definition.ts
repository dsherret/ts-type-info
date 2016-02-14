import {WrappedSymbolNode} from "./../../wrappers";
import {DefinitionType} from "./../base";
import {BaseClassPropertyDefinition} from "./base";
import {ClassDefinition} from "./class-definition";

export class ClassStaticPropertyDefinition extends BaseClassPropertyDefinition {
    constructor(symbolNode: WrappedSymbolNode, parent: ClassDefinition) {
        super(symbolNode, parent, DefinitionType.ClassStaticProperty);
    }
}
