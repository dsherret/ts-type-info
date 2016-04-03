import CodeBlockWriter from "code-block-writer";
import {Scope} from "./../Scope";
import {applyMixins} from "./../../../utils";
import {DecoratorDefinition} from "./../../../definitions";
import {DecoratorStructure} from "./../../../structures";
import {DecoratableDefinition, DefinitionType, BaseFunctionDefinition} from "./../../base";
import {ScopedDefinition} from "./ScopedDefinition";

export class BaseClassMethodDefinition<ParameterType>
        extends BaseFunctionDefinition<ParameterType>
        implements DecoratableDefinition, ScopedDefinition {
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;

    constructor(definitionType: DefinitionType) {
        super(definitionType);
    }

    // DecoratableDefinition
    decorators: DecoratorDefinition[];
    addDecorators: (...decorators: DecoratorStructure[]) => this;
    // ScopeDefinition
    scope: Scope;
}

applyMixins(BaseClassMethodDefinition, BaseFunctionDefinition, [DecoratableDefinition, ScopedDefinition]);
