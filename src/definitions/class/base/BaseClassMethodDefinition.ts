import CodeBlockWriter from "code-block-writer";
import {Scope} from "./../Scope";
import {applyMixins} from "./../../../utils";
import {DecoratorStructure} from "./../../../structures";
import {AsyncableDefinition, DecoratableDefinition, DefinitionType, BaseFunctionDefinition, FunctionBodyWriteableDefinition} from "./../../base";
import {DecoratorDefinition} from "./../../general";
import {BaseClassMethodParameterDefinition} from "./BaseClassMethodParameterDefinition";
import {ScopedDefinition} from "./ScopedDefinition";

export abstract class BaseClassMethodDefinition<ParameterType extends BaseClassMethodParameterDefinition, ParameterStructureType>
        extends BaseFunctionDefinition<ParameterType, ParameterStructureType>
        implements AsyncableDefinition, DecoratableDefinition, ScopedDefinition, FunctionBodyWriteableDefinition {

    constructor(definitionType: DefinitionType) {
        super(definitionType);
    }

    // AsyncableDefinition
    isAsync: boolean;
    // FunctionBodyWriteableDefinition
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;
    // ParameteredDefinition
    abstract addParameters(...parameters: ParameterStructureType[]): this;
    // DecoratableDefinition
    decorators: DecoratorDefinition[];
    addDecorators: (...decorators: DecoratorStructure[]) => this;
    getDecorator: (nameOrSearchFunction: string | ((decorator: DecoratorDefinition) => boolean)) => DecoratorDefinition;
    // ScopeDefinition
    scope: Scope;
}

applyMixins(BaseClassMethodDefinition, BaseFunctionDefinition, [AsyncableDefinition, DecoratableDefinition, ScopedDefinition, FunctionBodyWriteableDefinition]);
