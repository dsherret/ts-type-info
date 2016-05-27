import {ModuleMemberDefinitions} from "./../definitions";
import {StructureFactory} from "./../factories";
import {FileStructure} from "./../structures";
import {DefinitionUtils, FileUtils} from "./../utils";
import {FileDefinition} from "./file";

export class GlobalDefinition {
    files: FileDefinition[] = [];

    addFiles(...files: FileStructure[]) {
        const factory = new StructureFactory();
        this.files.push(...files.map(f => factory.getFile(f)));
        return this;
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
}
