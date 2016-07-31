import {ModuleMemberDefinitions} from "./../definitions";
import {StructureFactory} from "./../factories";
import {FileStructure} from "./../structures";
import {DefinitionUtils, FileUtils, renameDefinitionAs} from "./../utils";
import {FileDefinition} from "./file";

export class GlobalDefinition {
    files: FileDefinition[] = [];

    addDefinitionAsImportToFile(opts: { definition: ModuleMemberDefinitions; file: FileDefinition; alias?: string }) {
        const fileAndNamespaces = this.getFileAndNamespacesToDefinition(opts.definition);

        if (fileAndNamespaces == null) {
            throw new Error("The specified definition does not exist in any other file.");
        }
        else {
            const rootDef = fileAndNamespaces.namespaces.length > 0 ? fileAndNamespaces.namespaces[0] : opts.definition;

            if (!rootDef.isNamedExportOfFile && !rootDef.isDefaultExportOfFile) {
                throw new Error("The specified definition is not exported from a file.");
            }

            opts.file.addImport({
                namedImports: [{
                    name: rootDef.isDefaultExportOfFile ? "default" : rootDef.name,
                    alias: opts.alias || (rootDef.isDefaultExportOfFile ? rootDef.name : undefined)
                }],
                moduleSpecifier: opts.file.getModuleSpecifierToFile(fileAndNamespaces.file)
            });
            opts.file.imports[opts.file.imports.length - 1].namedImports[0].definitions.push(rootDef);
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
            // todo: why did I have to add an assertion here in TS 2.0? Shouldn't it figure this out as a string?
            searchFunction = (def) => FileUtils.filePathMatches(def.fileName, fileNameOrSearchFunction as string);
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
        renameDefinitionAs({
            globalDef: this,
            definition,
            newName
        });
    }
}
