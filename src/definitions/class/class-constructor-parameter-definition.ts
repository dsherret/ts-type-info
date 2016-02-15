import {applyMixins, ArrayExt} from "./../../utils";
import {WrappedSymbolNode} from "./../../wrappers";
import {DecoratorDefinition} from "./../general";
import {IDecoratableDefinition, DecoratableDefinition, DefinitionType, BaseParameterDefinition} from "./../base";
import {ClassConstructorDefinition} from "./class-constructor-definition";
import {ClassConstructorParameterScope} from "./class-constructor-parameter-scope";

export class ClassConstructorParameterDefinition extends BaseParameterDefinition<ClassConstructorDefinition> implements IDecoratableDefinition {
    scope: ClassConstructorParameterScope;

    constructor(symbolNode: WrappedSymbolNode, parent: ClassConstructorDefinition) {
        super(symbolNode, parent, DefinitionType.ClassConstructorParameter);
        this.fillDecorators(symbolNode);
        this.scope = symbolNode.getClassConstructorParameterScope();
    }

    // DecoratableDefinition
    fillDecorators: (symbolNode: WrappedSymbolNode) => void;
    decorators: ArrayExt<DecoratorDefinition<this>>;
}

applyMixins(ClassConstructorParameterDefinition, [DecoratableDefinition]);
