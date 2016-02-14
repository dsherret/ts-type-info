import {applyMixins} from "./../../utils";
import {WrappedSymbolNode} from "./../../wrappers";
import {DecoratorDefinition} from "./../general";
import {IDecoratableDefinition, DecoratableDefinition, DefinitionType, BaseParameterDefinition} from "./../base";
import {ClassConstructorDefinition} from "./class-constructor-definition";

export class ClassConstructorParameterDefinition extends BaseParameterDefinition<ClassConstructorDefinition> implements IDecoratableDefinition {
    constructor(symbolNode: WrappedSymbolNode, parent: ClassConstructorDefinition) {
        super(symbolNode, parent, DefinitionType.ClassConstructorParameter);
        this.fillDecorators(symbolNode);
    }

    // DecoratableDefinition
    fillDecorators: (symbolNode: WrappedSymbolNode) => void;
    decorators: DecoratorDefinition<this>[];
}

applyMixins(ClassConstructorParameterDefinition, [DecoratableDefinition]);
