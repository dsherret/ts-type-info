import CodeBlockWriter from "code-block-writer";
import {Scope} from "./../Scope";
import {applyMixins} from "./../../../utils";
import {DecoratorDefinition} from "./../../../definitions";
import {DecoratorStructure} from "./../../../structures";
import {DecoratableDefinition, DefinitionType, BaseFunctionDefinition} from "./../../base";
import {BaseClassMethodParameterDefinition} from "./BaseClassMethodParameterDefinition";
import {ScopedDefinition} from "./ScopedDefinition";

export abstract class BaseClassMethodDefinition<ParameterType extends BaseClassMethodParameterDefinition, ParameterStructureType>
        extends BaseFunctionDefinition<ParameterType, ParameterStructureType>
        implements DecoratableDefinition, ScopedDefinition {
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;

    constructor(definitionType: DefinitionType) {
        super(definitionType);
    }

    // ParameteredDefinition
    abstract addParameters(...parameters: ParameterStructureType[]): this;
    // DecoratableDefinition
    decorators: DecoratorDefinition[];
    addDecorators: (...decorators: DecoratorStructure[]) => this;
    getDecorator: (nameOrSearchFunction: string | ((decorator: DecoratorDefinition) => boolean)) => DecoratorDefinition;
    // ScopeDefinition
    scope: Scope;
}

applyMixins(BaseClassMethodDefinition, BaseFunctionDefinition, [DecoratableDefinition, ScopedDefinition]);
