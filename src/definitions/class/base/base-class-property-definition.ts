import {applyMixins, ArrayExt} from "./../../../utils";
import {WrappedSymbolNode} from "./../../../wrappers";
import {BaseClassPropertyStructure, DecoratableStructure, ScopedStructure} from "./../../../structures";
import {IDecoratableDefinition, DecoratableDefinition, DefinitionType, ObjectPropertyDefinition} from "./../../base";
import {DecoratorDefinition} from "./../../general";
import {Scope} from "./../scope";
import {ClassDefinition} from "./../class-definition";
import {IScopedDefinition, ScopedDefinition} from "./scoped-definition";

export class BaseClassPropertyDefinition extends ObjectPropertyDefinition<ClassDefinition> implements IDecoratableDefinition, IScopedDefinition {
    constructor(symbolNodeOrStructure: WrappedSymbolNode | BaseClassPropertyStructure, parent: ClassDefinition, definitionType: DefinitionType) {
        super(symbolNodeOrStructure, parent, definitionType);

        this.fillDecorators(symbolNodeOrStructure);
        this.fillScope(symbolNodeOrStructure);
    }

    // DecoratableDefinition
    decorators: ArrayExt<DecoratorDefinition<this>>;
    fillDecorators: (symbolNode: WrappedSymbolNode | DecoratableStructure) => void;
    // ScopeDefinition
    scope: Scope;
    fillScope: (symbolNode: WrappedSymbolNode | ScopedStructure) => void;
}

applyMixins(BaseClassPropertyDefinition, [DecoratableDefinition, ScopedDefinition]);
