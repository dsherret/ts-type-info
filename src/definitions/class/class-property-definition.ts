import {WrappedSymbolNode} from "./../../wrappers";
import {ClassPropertyStructure} from "./../../structures";
import {DefinitionType} from "./../base";
import {BaseClassPropertyDefinition} from "./base";
import {ClassDefinition} from "./class-definition";

export class ClassPropertyDefinition extends BaseClassPropertyDefinition {
    isAccessor: boolean;
    isReadonly: boolean;
    isConstructorParameter: boolean;

    constructor(symbolNode: WrappedSymbolNode, parent: ClassDefinition);
    constructor(structure: ClassPropertyStructure);
    constructor(symbolNodeOrStructure: WrappedSymbolNode | ClassPropertyStructure, parent?: ClassDefinition) {
        super(symbolNodeOrStructure, parent, DefinitionType.ClassProperty);

        if (symbolNodeOrStructure instanceof WrappedSymbolNode) {
            this.isAccessor = symbolNodeOrStructure.isPropertyAccessor();
            this.isReadonly = symbolNodeOrStructure.isPropertyReadonly();
        }
        else {
            this.isAccessor = symbolNodeOrStructure.isAccessor;
            this.isReadonly = symbolNodeOrStructure.isReadonly;
        }
    }
}
