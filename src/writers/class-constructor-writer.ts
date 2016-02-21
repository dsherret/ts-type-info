import {ClassConstructorDefinition} from "./../definitions";
import {ParametersWriter} from "./parameters-writer";
import {BaseDefinitionWriter} from "./base-definition-writer";
import {FunctionBodyWriter} from "./function-body-writer";

export class ClassConstructorWriter extends BaseDefinitionWriter<ClassConstructorDefinition> {
    private parametersWriter = new ParametersWriter(this.writer, this.flags);
    private functionBodyWriter = new FunctionBodyWriter(this.writer, this.flags);

    protected writeDefault(def: ClassConstructorDefinition) {
        this.writer.write("constructor");
        this.parametersWriter.write(def.parameters);
        this.functionBodyWriter.write(def);
    }
}
