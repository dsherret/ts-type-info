import {MainDefinitions, ExportableDefinitions, BaseDefinition} from "./../definitions";
import {DefinitionUtils} from "./../utils";
import {BaseWriter} from "./base-writer";

export abstract class BaseDefinitionWriter<DefinitionType extends BaseDefinition> extends BaseWriter {
    write(def: DefinitionType) {
        if (typeof def.onBeforeWrite === "function") {
            def.onBeforeWrite(this.writer);
        }

        this.writeDefault(def);

        if (typeof def.onAfterWrite === "function") {
            def.onAfterWrite(this.writer);
        }
    }

    protected abstract writeDefault(def: DefinitionType): void;

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
