import {ImportDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";

export class ImportWriter extends BaseDefinitionWriter<ImportDefinition> {
    protected writeDefault(def: ImportDefinition, flags: WriteFlags) {
        this.writer.write("import ");

        if (def.starImportName) {
            this.writeStarImport(def);
        }
        else {
            const hasDefaultImport = def.defaultImport != null;

            if (hasDefaultImport) {
                this.writeDefaultImport(def);
            }

            if ((def.namedImports || []).length > 0) {
                this.writer.conditionalWrite(hasDefaultImport, ", ");
                this.writeNamedImports(def);
            }
        }

        this.writeModuleSpecifier(def);
        this.writer.newLine();
    }

    private writeStarImport(def: ImportDefinition) {
        this.writer.write(`* as ${def.starImportName}`);
    }

    private writeDefaultImport(def: ImportDefinition) {
        if (def.defaultImport != null) {
            this.writer.write(def.defaultImport.importName);
        }
    }

    private writeNamedImports(def: ImportDefinition) {
        this.writer.write("{");
        (def.namedImports || []).forEach((namedImport, i) => {
            let alias = namedImport.importName;
            let name = namedImport.importName;
            this.writer.conditionalWrite(i !== 0, ", ");

            if ((namedImport.definitions || []).length > 0) {
                name = namedImport.definitions[0].name || name;
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

    private writeModuleSpecifier(def: ImportDefinition) {
        this.writer.write(` from "${def.moduleSpecifier}";`);
    }
}
