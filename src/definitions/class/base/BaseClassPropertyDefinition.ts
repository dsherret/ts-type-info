import * as typeConstants from "./../../../typeConstants";
import {applyMixins} from "./../../../utils";
import {DecoratorStructure} from "./../../../structures";
import {DecoratableDefinition, BaseObjectPropertyDefinition, NodedDefinition} from "./../../base";
import {DecoratorDefinition} from "./../../general";
import {Scope} from "./../Scope";
import {ScopedDefinition} from "./ScopedDefinition";

export class BaseClassPropertyDefinition
        extends BaseObjectPropertyDefinition
        implements DecoratableDefinition, ScopedDefinition, NodedDefinition {
    // DecoratableDefinition
    decorators: DecoratorDefinition[];
    addDecorator: (structure: DecoratorStructure) => DecoratorDefinition;
    getDecorator: (nameOrSearchFunction: string | ((decorator: DecoratorDefinition) => boolean)) => DecoratorDefinition;
    // ScopeDefinition
    scope: Scope;
    // NodedDefinition
    tsNode?: typeConstants.TypeScriptNode;
}

applyMixins(BaseClassPropertyDefinition, BaseObjectPropertyDefinition, [DecoratableDefinition, ScopedDefinition, NodedDefinition]);
