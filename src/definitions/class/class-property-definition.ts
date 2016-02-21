import {ISymbolNode} from "./../../wrappers";
import {MainFactory} from "./../../factories";
import {DefinitionType} from "./../base";
import {BaseClassPropertyDefinition} from "./base";
import {ClassDefinition} from "./class-definition";

export class ClassPropertyDefinition extends BaseClassPropertyDefinition {
    isAccessor: boolean;
    isReadonly: boolean;
    isConstructorParameter: boolean;

    constructor(mainFactory: MainFactory, symbolNode: ISymbolNode, parent: ClassDefinition) {
        super(mainFactory, symbolNode, parent, DefinitionType.ClassProperty);

        this.isAccessor = symbolNode.isPropertyAccessor();
        this.isReadonly = symbolNode.isPropertyReadonly();
        this.isConstructorParameter = symbolNode.isConstructorParameter();
    }
}
