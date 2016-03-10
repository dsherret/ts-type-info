import {applyMixins, ArrayExt} from "./../../../utils";
import {MainFactory} from "./../../../factories";
import {INode} from "./../../../wrappers";
import {IDecoratableDefinition, DecoratableDefinition, DefinitionType, ObjectPropertyDefinition} from "./../../base";
import {DecoratorDefinition} from "./../../general";
import {Scope} from "./../Scope";
import {ClassDefinition} from "./../ClassDefinition";
import {IScopedDefinition, ScopedDefinition} from "./ScopedDefinition";

export class BaseClassPropertyDefinition extends ObjectPropertyDefinition<ClassDefinition> implements IDecoratableDefinition, IScopedDefinition {
    constructor(mainFactory: MainFactory, node: INode, parent: ClassDefinition, definitionType: DefinitionType) {
        super(mainFactory, node, parent, definitionType);

        this.fillDecorators(node);
        this.fillScope(node);
    }

    // DecoratableDefinition
    decorators: ArrayExt<DecoratorDefinition<this>>;
    fillDecorators: (node: INode) => void;
    // ScopeDefinition
    scope: Scope;
    fillScope: (node: INode) => void;
}

applyMixins(BaseClassPropertyDefinition, [DecoratableDefinition, ScopedDefinition]);
