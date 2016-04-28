import {ReExportDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";

export class ReExportWriter extends BaseDefinitionWriter<ReExportDefinition> {
    protected writeDefault(def: ReExportDefinition, flags: WriteFlags) {
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
            let alias = namedExport.exportName;
            let name = namedExport.exportName;
            this.writer.conditionalWrite(i !== 0, ", ");

            if ((namedExport.definitions || []).length > 0) {
                name = namedExport.definitions[0].name || name;
            }

            if (name !== alias) {
                this.writer.write(`${name} as ${alias}`);
            }
            else {
                this.writer.write(`${name}`);
            }
        });
        this.writer.write("}");
    }
}
