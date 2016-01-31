import {FileDefinition, ExportedDefinitions} from "./../definitions";
import {Expression} from "./../expressions";
import {BaseWriter} from "./base-writer";
import {ModuledWriter} from "./moduled-writer";
import {WriteFlags} from "./../write-flags";

export class FileWriter extends BaseWriter {
    private moduledWriter = new ModuledWriter(this.writer);

    write(def: FileDefinition, flags: WriteFlags) {
        this.moduledWriter.write(def, flags);
        this.writeDefaultExport(def);
    }

    private writeDefaultExport(def: FileDefinition) {
        if (def.defaultExport != null) {
            this.writer.newLine();
            this.writer.write("export default ");

            const exportedDef = def.defaultExport as ExportedDefinitions;
            const expression = (def.defaultExport as Expression);

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
