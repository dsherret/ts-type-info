import CodeBlockWriter from "code-block-writer";
import {StructureFactory} from "./../../factories";
import {ClassConstructorParameterStructure} from "./../../structures";
import {BaseDefinition, DefinitionType, ParameteredDefinition} from "./../base";
import {applyMixins} from "./../../utils";
import {ClassConstructorParameterDefinition} from "./ClassConstructorParameterDefinition";

export class ClassConstructorDefinition extends BaseDefinition implements ParameteredDefinition<ClassConstructorParameterDefinition, ClassConstructorParameterStructure> {
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;

    constructor() {
        super(DefinitionType.ClassConstructor);
    }

    addParameters(...parameters: ClassConstructorParameterStructure[]) {
        const factory = new StructureFactory();
        this.parameters.push(...parameters.map(p => factory.getClassConstructorParameter(p)));
        return this;
    }

    // ParameteredDefinition
    parameters: ClassConstructorParameterDefinition[];
}

applyMixins(ClassConstructorDefinition, BaseDefinition, [ParameteredDefinition]);
