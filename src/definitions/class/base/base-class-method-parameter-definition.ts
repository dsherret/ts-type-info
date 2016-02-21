import {applyMixins, ArrayExt} from "./../../../utils";
import {MainFactory} from "./../../../factories";
import {ISymbolNode} from "./../../../wrappers";
import {DecoratorDefinition} from "./../../general";
import {IDecoratableDefinition, DecoratableDefinition, DefinitionType, BaseParameterDefinition} from "./../../base";

export class BaseClassMethodParameterDefinition<ParentType> extends BaseParameterDefinition<ParentType> implements IDecoratableDefinition {
    constructor(mainFactory: MainFactory, symbolNode: ISymbolNode, parent: ParentType, definitionType: DefinitionType) {
        super(mainFactory, symbolNode, parent, definitionType);
        this.fillDecorators(symbolNode);
    }

    // DecoratableDefinition
    decorators: ArrayExt<DecoratorDefinition<this>>;
    fillDecorators: (symbolNode: ISymbolNode) => void;
}

applyMixins(BaseClassMethodParameterDefinition, [DecoratableDefinition]);
