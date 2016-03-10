import {ClassConstructorDefinition} from "./../definitions";
import {ParametersWriter} from "./ParametersWriter";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {FunctionBodyWriter} from "./FunctionBodyWriter";

export class ClassConstructorWriter extends BaseDefinitionWriter<ClassConstructorDefinition> {
    private parametersWriter = new ParametersWriter(this.writer, this.flags);
    private functionBodyWriter = new FunctionBodyWriter(this.writer, this.flags);

    protected writeDefault(def: ClassConstructorDefinition) {
        this.writer.write("constructor");
        this.parametersWriter.write(def.parameters);
        this.functionBodyWriter.write(def);
    }
}
