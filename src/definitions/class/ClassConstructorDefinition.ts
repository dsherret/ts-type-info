import CodeBlockWriter from "code-block-writer";
import {BaseDefinition, DefinitionType, ParameteredDefinition} from "./../base";
import {applyMixins} from "./../../utils";
import {ClassConstructorParameterDefinition} from "./ClassConstructorParameterDefinition";

export class ClassConstructorDefinition
        extends BaseDefinition
        implements ParameteredDefinition<ClassConstructorParameterDefinition> {
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;

    constructor() {
        super(DefinitionType.ClassConstructor);
    }

    // ParameteredDefinition
    parameters: ClassConstructorParameterDefinition[];
}

applyMixins(ClassConstructorDefinition, BaseDefinition, [ParameteredDefinition]);
