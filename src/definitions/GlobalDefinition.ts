import {ModuleMemberDefinitions} from "./../definitions";
import {StructureFactory} from "./../factories";
import {FileStructure} from "./../structures";
import {DefinitionUtils, FileUtils, DefinitionRenamer} from "./../utils";
import {FileDefinition} from "./file";

export class GlobalDefinition {
    files: FileDefinition[] = [];

    addDefinitionAsImportToFile(opts: { definition: ModuleMemberDefinitions; file: FileDefinition; alias?: string }) {
        if (!opts.definition.isExported && !opts.definition.isDefaultExportOfFile) {
            throw new Error("The specified definition is not exported from a file.");
        }

        const fileAndNamespaces = this.getFileAndNamespacesToDefinition(opts.definition);

        if (fileAndNamespaces == null) {
            throw new Error("The specified definition does not exist in any other file.");
        }
        else if (fileAndNamespaces.namespaces.length > 0) {
            throw new Error(`The specified definition is located in the namespace ${fileAndNamespaces.namespaces[0].name}. Please move it out of the namespace.`);
        }
        else {
            opts.file.addImport({
                namedImports: [{
                    definition: opts.definition,
                    alias: opts.alias
                }],
                moduleSpecifier: opts.file.getModuleSpecifierToFile(fileAndNamespaces.file)
            });
        }
    }

    addFile(structure: FileStructure) {
        const def = new StructureFactory().getFile(structure);
        this.files.push(def);
        return def;
    }

    getFile(fileNameOrSearchFunction: string | ((file: FileDefinition) => boolean)) {
        let searchFunction = fileNameOrSearchFunction as ((file: FileDefinition) => boolean);

        if (typeof fileNameOrSearchFunction === "string") {
            searchFunction = (def) => FileUtils.filePathMatches(def.fileName, fileNameOrSearchFunction);
        }

        return DefinitionUtils.getDefinitionFromListByFunc(this.files, searchFunction);
    }

    getFileOfDefinition(def: ModuleMemberDefinitions) {
        const result = this.getFileAndNamespacesToDefinition(def);
        return result == null ? null : result.file;
    }

    getFileAndNamespacesToDefinition(def: ModuleMemberDefinitions) {
        for (let i = 0; i < this.files.length; i++) {
            let namespaces = this.files[i].getNamespacesToDefinition(def);
            if (namespaces != null) {
                return {
                    file: this.files[i],
                    namespaces: namespaces
                };
            }
        }

        return null;
    }

    renameDefinitionAs(definition: ModuleMemberDefinitions, newName: string) {
        const renamer = new DefinitionRenamer(this.files, definition);
        renamer.renameAs(newName);
    }
}
