import {ISymbolNode} from "./../../wrappers";
import {MainCache} from "./../../utils";
import {DefinitionType} from "./../base";
import {BaseClassPropertyDefinition} from "./base";
import {ClassDefinition} from "./class-definition";

export class ClassStaticPropertyDefinition extends BaseClassPropertyDefinition {
    constructor(mainCache: MainCache, symbolNode: ISymbolNode, parent: ClassDefinition) {
        super(mainCache, symbolNode, parent, DefinitionType.ClassStaticProperty);
    }
}
