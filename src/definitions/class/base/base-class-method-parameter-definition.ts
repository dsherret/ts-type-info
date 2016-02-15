import {applyMixins, ExtendedArray} from "./../../../utils";
import {WrappedSymbolNode} from "./../../../wrappers";
import {DecoratorDefinition} from "./../../general";
import {IDecoratableDefinition, DecoratableDefinition, DefinitionType, BaseParameterDefinition} from "./../../base";

export class BaseClassMethodParameterDefinition<ParentType> extends BaseParameterDefinition<ParentType> implements IDecoratableDefinition {
    constructor(symbolNode: WrappedSymbolNode, parent: ParentType, definitionType: DefinitionType) {
        super(symbolNode, parent, definitionType);
        this.fillDecorators(symbolNode);
    }

    // DecoratableDefinition
    decorators: ExtendedArray<DecoratorDefinition<this>>;
    fillDecorators: (symbolNode: WrappedSymbolNode) => void;
}

applyMixins(BaseClassMethodParameterDefinition, [DecoratableDefinition]);
