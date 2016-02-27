import {INode} from "./../../wrappers";
import {MainFactory} from "./../../factories";
import {DefinitionType} from "./../base";
import {BaseClassPropertyDefinition} from "./base";
import {ClassDefinition} from "./class-definition";

export class ClassPropertyDefinition extends BaseClassPropertyDefinition {
    isAccessor: boolean;
    isReadonly: boolean;
    isConstructorParameter: boolean;

    constructor(mainFactory: MainFactory, node: INode, parent: ClassDefinition) {
        super(mainFactory, node, parent, DefinitionType.ClassProperty);

        const symbol = node.getSymbol();

        this.isAccessor = symbol.isPropertyAccessor();
        this.isReadonly = symbol.isPropertyReadonly();
        this.isConstructorParameter = node.isConstructorParameter();
    }
}
