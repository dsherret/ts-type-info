import {ImportDefinition} from "./../definitions";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";

export class ImportWriter extends BaseDefinitionWriter<ImportDefinition> {
    protected writeDefault(def: ImportDefinition) {
        const hasDefaultImport = def.defaultImport != null;
        const hasStarImport = def.starImportName != null && def.starImportName.length > 0;
        const hasNamedImports = (def.namedImports || []).length > 0;

        this.writer.write("import ");

        if (hasDefaultImport) {
            this.writeDefaultImport(def);
            this.writer.conditionalWrite(hasStarImport || hasNamedImports, ", ");
        }

        if (hasStarImport) {
            this.writeStarImport(def);
        }
        else if (hasNamedImports) {
            this.writeNamedImports(def);
        }

        if (hasDefaultImport || hasStarImport || hasNamedImports) {
            this.writer.write(" from ");
        }

        this.writer.write(`"${def.moduleSpecifier}";`);
        this.writer.newLine();
    }

    private writeStarImport(def: ImportDefinition) {
        this.writer.write(`* as ${def.starImportName}`);
    }

    private writeDefaultImport(def: ImportDefinition) {
        if (def.defaultImport != null) {
            this.writer.write(def.defaultImport.name);
        }
    }

    private writeNamedImports(def: ImportDefinition) {
        this.writer.write("{");
        (def.namedImports || []).forEach((namedImport, i) => {
            let {name, alias} = namedImport;
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
