import {WrappedSymbolNode} from "./../../wrappers";
import {DefinitionType} from "./../base";
import {BaseClassPropertyDefinition} from "./base";
import {ClassDefinition} from "./class-definition";

export class ClassPropertyDefinition extends BaseClassPropertyDefinition {
    isAccessor: boolean;
    isReadonly: boolean;
    isConstructorParameter: boolean;

    constructor(symbolNode: WrappedSymbolNode, parent: ClassDefinition) {
        super(symbolNode, parent, DefinitionType.ClassProperty);

        this.isAccessor = symbolNode.isPropertyAccessor();
        this.isReadonly = symbolNode.isPropertyReadonly();
    }
}
