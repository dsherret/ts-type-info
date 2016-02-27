import CodeBlockWriter from "code-block-writer";
import {Scope} from "./../scope";
import {applyMixins, ArrayExt} from "./../../../utils";
import {MainFactory} from "./../../../factories";
import {INode} from "./../../../wrappers";
import {DecoratorDefinition} from "./../../../definitions";
import {IDecoratableDefinition, DecoratableDefinition, DefinitionType, BaseFunctionDefinition, BaseParameterDefinitionConstructor} from "./../../base";
import {ClassDefinition} from "./../class-definition";
import {IScopedDefinition, ScopedDefinition} from "./scoped-definition";

export class BaseClassMethodDefinition<ParameterType>
        extends BaseFunctionDefinition<ClassDefinition, ParameterType>
        implements IDecoratableDefinition, IScopedDefinition {
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;

    constructor(
        mainFactory: MainFactory,
        node: INode,
        parameterDefinition: BaseParameterDefinitionConstructor<BaseFunctionDefinition<ClassDefinition, ParameterType>, ParameterType>,
        parent: ClassDefinition,
        definitionType: DefinitionType
    ) {
        super(mainFactory, node, parameterDefinition, definitionType);
        this.fillDecorators(node);
        this.fillScope(node);
        this.parent = parent;
    }

    // DecoratableDefinition
    decorators: ArrayExt<DecoratorDefinition<this>>;
    fillDecorators: (node: INode) => void;
    // ScopeDefinition
    scope: Scope;
    fillScope: (node: INode) => void;
}

applyMixins(BaseClassMethodDefinition, [DecoratableDefinition, ScopedDefinition]);
