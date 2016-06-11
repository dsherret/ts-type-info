import CodeBlockWriter from "code-block-writer";
import {StructureFactory} from "./../../factories";
import {ClassConstructorParameterStructure} from "./../../structures";
import {BaseDefinition, DefinitionType, ParameteredDefinition, FunctionBodyWriteableDefinition} from "./../base";
import {applyMixins} from "./../../utils";
import {ClassConstructorParameterDefinition} from "./ClassConstructorParameterDefinition";

export class ClassConstructorDefinition
        extends BaseDefinition
        implements ParameteredDefinition<ClassConstructorParameterDefinition, ClassConstructorParameterStructure>, FunctionBodyWriteableDefinition {

    constructor() {
        super(DefinitionType.ClassConstructor);
    }

    addParameter(structure: ClassConstructorParameterStructure) {
        const def = new StructureFactory().getClassConstructorParameter(structure);
        this.parameters.push(def);
        return def;
    }

    // FunctionBodyWriteableDefinition
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;
    // ParameteredDefinition
    parameters: ClassConstructorParameterDefinition[];
    getParameter: (nameOrSearchFunction: string | ((parameter: ClassConstructorParameterDefinition) => boolean)) => ClassConstructorParameterDefinition;
}

applyMixins(ClassConstructorDefinition, BaseDefinition, [ParameteredDefinition, FunctionBodyWriteableDefinition]);
