import {applyMixins, ArrayExt} from "./../../../utils";
import {IDefinitionFactory} from "./../../../factories";
import {ISymbolNode} from "./../../../wrappers";
import {DecoratorDefinition} from "./../../general";
import {IDecoratableDefinition, DecoratableDefinition, DefinitionType, BaseParameterDefinition} from "./../../base";

export class BaseClassMethodParameterDefinition<ParentType> extends BaseParameterDefinition<ParentType> implements IDecoratableDefinition {
    constructor(definitionFactory: IDefinitionFactory, symbolNode: ISymbolNode, parent: ParentType, definitionType: DefinitionType) {
        super(definitionFactory, symbolNode, parent, definitionType);
        this.fillDecorators(symbolNode);
    }

    // DecoratableDefinition
    decorators: ArrayExt<DecoratorDefinition<this>>;
    fillDecorators: (symbolNode: ISymbolNode) => void;
}

applyMixins(BaseClassMethodParameterDefinition, [DecoratableDefinition]);
