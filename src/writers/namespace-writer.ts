import {NamespaceDefinition, NamespaceDeclarationType} from "./../definitions";
import CodeBlockWriter from "code-block-writer";
import {BaseWriter} from "./base-writer";
import {ModuledWriter} from "./moduled-writer";
import {WriteFlags} from "./../write-flags";

export class NamespaceWriter extends BaseWriter {
    constructor(writer: CodeBlockWriter, private moduledWriter: ModuledWriter) {
        super(writer);
    }

    write(def: NamespaceDefinition, flags: WriteFlags) {
        this.writeExportClause(def);
        this.writeDeclareClause(def);
        this.writer.write(this.getDeclarationTypeAsString(def.declarationType)).write(` ${def.name}`).block(() => {
            this.moduledWriter.write(def, flags);
        });
    }

    private getDeclarationTypeAsString(declarationType: NamespaceDeclarationType) {
        switch (declarationType) {
            case NamespaceDeclarationType.Module:
                return "module";
            case NamespaceDeclarationType.Namespace:
                return "namespace";
            default:
                throw `Not implemented NamespaceDeclarationType: ${NamespaceDeclarationType[declarationType]}`;
        }
    }
}
