import {FileDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {ModuledWriter} from "./ModuledWriter";
import {VariableWriter} from "./VariableWriter";

export class FileWriter extends BaseDefinitionWriter<FileDefinition> {
    private moduledWriter = new ModuledWriter(this.writer);
    private variableWriter = new VariableWriter(this.writer);

    protected writeDefault(def: FileDefinition, flags: WriteFlags) {
        this.writeVariables(def, flags);
        this.moduledWriter.write(def, flags);
        this.writeDefaultExport(def);
    }

    private writeVariables(fileDef: FileDefinition, flags: WriteFlags) {
        fileDef.variables.forEach(variableDef => {
            this.variableWriter.write(variableDef, flags);
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
