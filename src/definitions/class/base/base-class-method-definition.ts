import CodeBlockWriter from "code-block-writer";
import {Scope} from "./../scope";
import {applyMixins, ArrayExt} from "./../../../utils";
import {WrappedSymbolNode} from "./../../../wrappers";
import {BaseClassMethodStructure, ScopedStructure, DecoratableStructure, BaseClassMethodParameterStructure} from "./../../../structures";
import {DecoratorDefinition} from "./../../../definitions";
import {IDecoratableDefinition, DecoratableDefinition, DefinitionType, BaseFunctionDefinition, BaseParameterDefinitionConstructor} from "./../../base";
import {ClassDefinition} from "./../class-definition";
import {IScopedDefinition, ScopedDefinition} from "./scoped-definition";

export class BaseClassMethodDefinition<ParameterType, ParameterStructureType extends BaseClassMethodParameterStructure>
        extends BaseFunctionDefinition<ClassDefinition, ParameterType, ParameterStructureType>
        implements IDecoratableDefinition, IScopedDefinition {
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;

    constructor(
        symbolNodeOrStructure: WrappedSymbolNode | BaseClassMethodStructure<ParameterStructureType>,
        parameterDefinition: BaseParameterDefinitionConstructor<BaseFunctionDefinition<ClassDefinition, ParameterType, ParameterStructureType>, ParameterType, ParameterStructureType>,
        parent: ClassDefinition,
        definitionType: DefinitionType
    ) {
        super(symbolNodeOrStructure, parameterDefinition, definitionType);
        this.fillDecorators(symbolNodeOrStructure);
        this.fillScope(symbolNodeOrStructure);
        this.parent = parent;
    }

    // DecoratableDefinition
    decorators: ArrayExt<DecoratorDefinition<this>>;
    fillDecorators: (symbolNode: WrappedSymbolNode | DecoratableStructure) => void;
    // ScopeDefinition
    scope: Scope;
    fillScope: (symbolNode: WrappedSymbolNode | ScopedStructure) => void;
}

applyMixins(BaseClassMethodDefinition, [DecoratableDefinition, ScopedDefinition]);
