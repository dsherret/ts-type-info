import {applyMixins, ArrayExt} from "./../../../utils";
import {MainFactory} from "./../../../factories";
import {ISymbolNode} from "./../../../wrappers";
import {IDecoratableDefinition, DecoratableDefinition, DefinitionType, ObjectPropertyDefinition} from "./../../base";
import {DecoratorDefinition} from "./../../general";
import {Scope} from "./../scope";
import {ClassDefinition} from "./../class-definition";
import {IScopedDefinition, ScopedDefinition} from "./scoped-definition";

export class BaseClassPropertyDefinition extends ObjectPropertyDefinition<ClassDefinition> implements IDecoratableDefinition, IScopedDefinition {
    constructor(mainFactory: MainFactory, symbolNode: ISymbolNode, parent: ClassDefinition, definitionType: DefinitionType) {
        super(mainFactory, symbolNode, parent, definitionType);

        this.fillDecorators(symbolNode);
        this.fillScope(symbolNode);
    }

    // DecoratableDefinition
    decorators: ArrayExt<DecoratorDefinition<this>>;
    fillDecorators: (symbolNode: ISymbolNode) => void;
    // ScopeDefinition
    scope: Scope;
    fillScope: (symbolNode: ISymbolNode) => void;
}

applyMixins(BaseClassPropertyDefinition, [DecoratableDefinition, ScopedDefinition]);
