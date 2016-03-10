import {ExportableDefinitions, IAmbientableDefinition, BaseDefinition} from "./../definitions";
import {DefinitionUtils} from "./../utils";
import {BaseWriter} from "./BaseWriter";

export abstract class BaseDefinitionWriter<DefinitionType extends BaseDefinition> extends BaseWriter {
    write(def: DefinitionType) {
        if (typeof def.onBeforeWrite === "function") {
            def.onBeforeWrite(this.writer);
            this.writer.newLineIfLastCharNotNewLine();
        }

        this.writeDefault(def);

        if (typeof def.onAfterWrite === "function") {
            def.onAfterWrite(this.writer);
            this.writer.newLineIfLastCharNotNewLine();
        }
    }

    protected abstract writeDefault(def: DefinitionType): void;

    protected writeExportClause(def: ExportableDefinitions) {
        if (def.isExported && !def.isDefaultExportOfFile) {
            let shouldWrite = false;

            if (def.isInterfaceDefinition()) {
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

    protected writeDeclareClause(def: IAmbientableDefinition) {
        if (def.hasDeclareKeyword) {
            this.writer.write("declare ");
        }
    }
}
