import CodeBlockWriter from "code-block-writer";
import {ImportDefinition, DefaultImportPartDefinition} from "./../definitions";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";

export class ImportWriter {
    constructor(private readonly writer: CodeBlockWriter, private readonly baseDefinitionWriter: BaseDefinitionWriter) {
    }

    write(def: ImportDefinition) {
        this.baseDefinitionWriter.writeWrap(def, () => this.writeInternal(def));
    }

    private writeInternal(def: ImportDefinition) {
        const hasDefaultImport = def.defaultImport != null;
        const hasStarImport = def.starImportName != null && def.starImportName.length > 0;
        const hasNamedImports = (def.namedImports || []).length > 0;

        this.writer.write("import ");

        if (hasDefaultImport) {
            this.writeDefaultImport(def.defaultImport!);
            this.writer.conditionalWrite(hasStarImport || hasNamedImports, ", ");
        }

        if (hasStarImport)
            this.writeStarImport(def);
        else if (hasNamedImports)
            this.writeNamedImports(def);

        if (hasDefaultImport || hasStarImport || hasNamedImports)
            this.writer.write(" from ");

        this.writer.write(`"${def.moduleSpecifier}";`);
    }

    private writeStarImport(def: ImportDefinition) {
        this.writer.write(`* as ${def.starImportName}`);
    }

    private writeDefaultImport(defaultImport: DefaultImportPartDefinition) {
        this.writer.write(defaultImport.name);
    }

    private writeNamedImports(def: ImportDefinition) {
        this.writer.write("{");
        (def.namedImports || []).forEach((namedImport, i) => {
            const {name, alias} = namedImport;
            this.writer.conditionalWrite(i !== 0, ", ");

            this.writer.write(name);

            if (alias != null && name !== alias)
                this.writer.write(` as ${alias}`);
        });
        this.writer.write("}");
    }
}
