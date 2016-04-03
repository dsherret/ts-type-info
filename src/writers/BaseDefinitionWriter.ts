import {ExportableDefinitions, AmbientableDefinition, BaseDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {BaseWriter} from "./BaseWriter";

export abstract class BaseDefinitionWriter<DefinitionType extends BaseDefinition> extends BaseWriter {
    write(def: DefinitionType, flags: WriteFlags) {
        if (typeof def.onBeforeWrite === "function") {
            def.onBeforeWrite(this.writer);
            this.writer.newLineIfLastCharNotNewLine();
        }

        this.writeDefault(def, flags);

        if (typeof def.onAfterWrite === "function") {
            def.onAfterWrite(this.writer);
            this.writer.newLineIfLastCharNotNewLine();
        }
    }

    protected abstract writeDefault(def: DefinitionType, flags: WriteFlags): void;

    protected writeExportClause(def: ExportableDefinitions, flags: WriteFlags) {
        if (def.isExported && !def.isDefaultExportOfFile) {
            let shouldWrite = false;

            if (def.isInterfaceDefinition() || def.isTypeAliasDefinition()) {
                shouldWrite = (flags & WriteFlags.IsInAmbientContext) === 0;
            }
            else {
                shouldWrite = !def.isAmbient;
            }

            if (shouldWrite) {
                this.writer.write("export ");
            }
        }
    }

    protected writeDeclareClause(def: AmbientableDefinition) {
        if (def.hasDeclareKeyword) {
            this.writer.write("declare ");
        }
    }
}
