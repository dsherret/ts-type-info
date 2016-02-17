import {applyMixins, ArrayExt} from "./../../../utils";
import {WrappedSymbolNode} from "./../../../wrappers";
import {DecoratableStructure} from "./../../../structures";
import {DecoratorDefinition} from "./../../general";
import {IDecoratableDefinition, DecoratableDefinition, DefinitionType, BaseParameterDefinition} from "./../../base";

export class BaseClassMethodParameterDefinition<ParentType> extends BaseParameterDefinition<ParentType> implements IDecoratableDefinition {
    constructor(symbolNode: WrappedSymbolNode, parent: ParentType, definitionType: DefinitionType) {
        super(symbolNode, parent, definitionType);
        this.fillDecorators(symbolNode);
    }

    // DecoratableDefinition
    decorators: ArrayExt<DecoratorDefinition<this>>;
    fillDecorators: (symbolNode: WrappedSymbolNode | DecoratableStructure) => void;
}

applyMixins(BaseClassMethodParameterDefinition, [DecoratableDefinition]);
