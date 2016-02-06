import {FileDefinition, ExportableDefinitions} from "./../definitions";
import {Expression} from "./../expressions";
import {BaseDefinitionWriter} from "./base-definition-writer";
import {ModuledWriter} from "./moduled-writer";
import {VariableWriter} from "./variable-writer";

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
        if (fileDef.defaultExport != null) {
            this.writer.newLine();
            this.writer.write("export default ");

            // todo: change to a user defined type guard
            const exportedDef = fileDef.defaultExport as ExportableDefinitions;
            const expression = fileDef.defaultExport as Expression;

            if (exportedDef.name != null) {
                this.writer.write(exportedDef.name);
            }
            else {
                this.writer.write(expression.text);
            }

            this.writer.write(";").newLine();
        }
    }
}
