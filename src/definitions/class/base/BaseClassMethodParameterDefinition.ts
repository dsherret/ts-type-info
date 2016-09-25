import {applyMixins} from "./../../../utils";
import {DecoratorStructure} from "./../../../structures";
import {DecoratorDefinition} from "./../../general";
import {DecoratableDefinition, BaseParameterDefinition} from "./../../base";
import {Scope} from "./../Scope";
import {ScopedDefinition} from "./ScopedDefinition";

export class BaseClassMethodParameterDefinition extends BaseParameterDefinition implements DecoratableDefinition, ScopedDefinition {
    // DecoratableDefinition
    decorators: DecoratorDefinition[];
    addDecorator: (structure: DecoratorStructure) => DecoratorDefinition;
    getDecorator: (nameOrSearchFunction: string | ((decorator: DecoratorDefinition) => boolean)) => DecoratorDefinition;
    // ScopedDefinition
    scope: Scope;
}

applyMixins(BaseClassMethodParameterDefinition, BaseParameterDefinition, [DecoratableDefinition]);
