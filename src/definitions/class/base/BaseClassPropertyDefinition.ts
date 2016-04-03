import {applyMixins} from "./../../../utils";
import {DecoratorStructure} from "./../../../structures";
import {DecoratableDefinition, DefinitionType, ObjectPropertyDefinition} from "./../../base";
import {DecoratorDefinition} from "./../../general";
import {Scope} from "./../Scope";
import {ScopedDefinition} from "./ScopedDefinition";

export class BaseClassPropertyDefinition extends ObjectPropertyDefinition implements DecoratableDefinition, ScopedDefinition {
    constructor(definitionType: DefinitionType) {
        super(definitionType);
    }

    // DecoratableDefinition
    decorators: DecoratorDefinition[];
    addDecorators: (...decorators: DecoratorStructure[]) => this;
    // ScopeDefinition
    scope: Scope;
}

applyMixins(BaseClassPropertyDefinition, ObjectPropertyDefinition, [DecoratableDefinition, ScopedDefinition]);
