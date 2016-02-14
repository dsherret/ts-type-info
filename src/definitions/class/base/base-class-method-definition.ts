import CodeBlockWriter from "code-block-writer";
import {Scope} from "./../scope";
import {applyMixins} from "./../../../utils";
import {WrappedSymbolNode} from "./../../../wrappers";
import {DecoratorDefinition} from "./../../../definitions";
import {IDecoratableDefinition, DecoratableDefinition, DefinitionType, BaseFunctionDefinition, BaseParameterDefinitionConstructor} from "./../../base";
import {ClassDefinition} from "./../class-definition";
import {IScopedDefinition, ScopedDefinition} from "./scoped-definition";

export class BaseClassMethodDefinition<ParameterType> extends BaseFunctionDefinition<ClassDefinition, ParameterType> implements IDecoratableDefinition, IScopedDefinition {
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;

    constructor(
        symbolNode: WrappedSymbolNode,
        parameterDefinition: BaseParameterDefinitionConstructor<BaseFunctionDefinition<ClassDefinition, ParameterType>, ParameterType>,
        parent: ClassDefinition,
        definitionType: DefinitionType
    ) {
        super(symbolNode, parameterDefinition, definitionType);
        this.fillDecorators(symbolNode);
        this.fillScope(symbolNode);
        this.parent = parent;
    }

    // DecoratableDefinition
    decorators: DecoratorDefinition<this>[];
    fillDecorators: (symbolNode: WrappedSymbolNode) => void;
    // ScopeDefinition
    scope: Scope;
    fillScope: (symbolNode: WrappedSymbolNode) => void;
}

applyMixins(BaseClassMethodDefinition, [DecoratableDefinition, ScopedDefinition]);
