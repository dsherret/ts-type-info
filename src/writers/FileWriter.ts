import {FileDefinition} from "./../definitions";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {ModuledWriter} from "./ModuledWriter";
import {VariableWriter} from "./VariableWriter";

export class FileWriter extends BaseDefinitionWriter<FileDefinition> {
    private moduledWriter = new ModuledWriter(this.writer, this.flags);
    private variableWriter = new VariableWriter(this.writer, this.flags);

    protected writeDefault(def: FileDefinition) {
        this.writeVariables(def);
        this.moduledWriter.write(def);
        this.writeDefaultExport(def);
    }

    private writeVariables(fileDef: FileDefinition) {
        fileDef.variables.forEach(variableDef => {
            this.variableWriter.write(variableDef);
        });
    }

    private writeDefaultExport(fileDef: FileDefinition) {
        const defaultExport = fileDef.defaultExport;

        if (defaultExport != null) {
            this.writer.newLine();
            this.writer.write("export default ");

            if (defaultExport.expression != null) {
                this.writer.write(defaultExport.expression.text);
            }
            else {
                this.writer.write(defaultExport.definitions[0].name);
            }

            this.writer.write(";").newLine();
        }
    }
}
