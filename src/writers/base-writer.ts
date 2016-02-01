import CodeBlockWriter from "code-block-writer";
import {MainDefinitions, ExportableDefinitions} from "./../definitions";
import {DefinitionUtils} from "./../utils";

export abstract class BaseWriter {
    constructor(protected writer: CodeBlockWriter) {
    }

    protected writeExportClause(def: ExportableDefinitions) {
        if (def.isExported && !def.isDefaultExportOfFile) {
            let shouldWrite = false;

            if (DefinitionUtils.isInterfaceDefinition(def)) {
                shouldWrite = !DefinitionUtils.isInterfaceInAmbientContext(def);
            }
            else {
                shouldWrite = !def.isAmbient;
            }

            if (shouldWrite) {
                this.writer.write("export ");
            }
        }
    }

    protected writeDeclareClause(def: MainDefinitions) {
        if (def.hasDeclareKeyword) {
            this.writer.write("declare ");
        }
    }
}
