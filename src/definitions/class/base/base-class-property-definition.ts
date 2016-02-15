import {applyMixins, ArrayExt} from "./../../../utils";
import {WrappedSymbolNode} from "./../../../wrappers";
import {IDecoratableDefinition, DecoratableDefinition, DefinitionType, ObjectPropertyDefinition} from "./../../base";
import {DecoratorDefinition} from "./../../general";
import {Scope} from "./../scope";
import {ClassDefinition} from "./../class-definition";
import {IScopedDefinition, ScopedDefinition} from "./scoped-definition";

export class BaseClassPropertyDefinition extends ObjectPropertyDefinition<ClassDefinition> implements IDecoratableDefinition, IScopedDefinition {
    constructor(symbolNode: WrappedSymbolNode, parent: ClassDefinition, definitionType: DefinitionType) {
        super(symbolNode, parent, definitionType);

        this.fillDecorators(symbolNode);
        this.fillScope(symbolNode);
    }

    // DecoratableDefinition
    decorators: ArrayExt<DecoratorDefinition<this>>;
    fillDecorators: (symbolNode: WrappedSymbolNode) => void;
    // ScopeDefinition
    scope: Scope;
    fillScope: (symbolNode: WrappedSymbolNode) => void;
}

applyMixins(BaseClassPropertyDefinition, [DecoratableDefinition, ScopedDefinition]);
