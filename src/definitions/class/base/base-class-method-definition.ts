import CodeBlockWriter from "code-block-writer";
import {Scope} from "./../scope";
import {applyMixins, ArrayExt} from "./../../../utils";
import {MainFactory} from "./../../../factories";
import {ISymbolNode} from "./../../../wrappers";
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
        symbolNode: ISymbolNode,
        parameterDefinition: BaseParameterDefinitionConstructor<BaseFunctionDefinition<ClassDefinition, ParameterType>, ParameterType>,
        parent: ClassDefinition,
        definitionType: DefinitionType
    ) {
        super(mainFactory, symbolNode, parameterDefinition, definitionType);
        this.fillDecorators(symbolNode);
        this.fillScope(symbolNode);
        this.parent = parent;
    }

    // DecoratableDefinition
    decorators: ArrayExt<DecoratorDefinition<this>>;
    fillDecorators: (symbolNode: ISymbolNode) => void;
    // ScopeDefinition
    scope: Scope;
    fillScope: (symbolNode: ISymbolNode) => void;
}

applyMixins(BaseClassMethodDefinition, [DecoratableDefinition, ScopedDefinition]);
