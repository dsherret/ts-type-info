import {ExportableDefinitions, AmbientableDefinition, AsyncableDefinition, BaseDefinition, EnumDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {BaseWriter} from "./BaseWriter";

export abstract class BaseDefinitionWriter<DefinitionType extends BaseDefinition> extends BaseWriter {
    write(def: DefinitionType, flags: WriteFlags) {
        if (typeof def.onBeforeWrite === "function") {
            def.onBeforeWrite(this.writer);
            this.writer.newLineIfLastNotNewLine();
        }

        this.writeDefault(def, flags);

        if (typeof def.onAfterWrite === "function") {
            def.onAfterWrite(this.writer);
            this.writer.newLineIfLastNotNewLine();
        }
    }

    protected abstract writeDefault(def: DefinitionType, flags: WriteFlags): void;

    protected writeAsyncKeyword(def: AsyncableDefinition) {
        this.writer.conditionalWrite(def.isAsync, "async ");
    }

    protected writeConstKeyword(def: EnumDefinition) {
        this.writer.conditionalWrite(def.isConst, "const ");
    }

    protected writeDeclareKeyword(def: AmbientableDefinition) {
        this.writer.conditionalWrite(def.hasDeclareKeyword, "declare ");
    }

    protected writeExportKeyword(def: ExportableDefinitions, flags: WriteFlags) {
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
}
