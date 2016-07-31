import {ReExportDefinition} from "./../definitions";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";

export class ReExportWriter extends BaseDefinitionWriter<ReExportDefinition> {
    protected writeDefault(def: ReExportDefinition) {
        this.writer.write("export ");

        if ((def.namedExports || []).length > 0) {
            this.writeNamedReExports(def);
        }
        else {
            this.writer.write("*");
        }

        this.writer.write(" from ");

        this.writer.write(`"${def.moduleSpecifier}";`);
        this.writer.newLine();
    }

    private writeNamedReExports(def: ReExportDefinition) {
        this.writer.write("{");
        (def.namedExports || []).forEach((namedExport, i) => {
            let {alias, name} = namedExport;
            this.writer.conditionalWrite(i !== 0, ", ");

            if (alias != null && name !== alias) {
                this.writer.write(`${name} as ${alias}`);
            }
            else {
                this.writer.write(`${name}`);
            }
        });
        this.writer.write("}");
    }
}
