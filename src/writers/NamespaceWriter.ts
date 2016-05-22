import CodeBlockWriter from "code-block-writer";
import {NamespaceDefinition, NamespaceDeclarationType} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {ModuledWriter} from "./ModuledWriter";

export class NamespaceWriter extends BaseDefinitionWriter<NamespaceDefinition> {
    constructor(writer: CodeBlockWriter, private moduledWriter: ModuledWriter) {
        super(writer);
    }

    protected writeDefault(def: NamespaceDefinition, flags: WriteFlags) {
        this.writeExportKeyword(def, flags);
        this.writeDeclareKeyword(def);
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
                throw `Not implemented NamespaceDeclarationType: ${declarationType}`;
        }
    }
}
