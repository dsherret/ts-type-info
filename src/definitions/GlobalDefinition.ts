import {StructureFactory} from "./../factories";
import {FileStructure} from "./../structures";
import {DefinitionUtils, StringUtils} from "./../utils";
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
            searchFunction = (def) => StringUtils.endsWith(def.fileName, fileNameOrSearchFunction);
        }

        return DefinitionUtils.getDefinitionFromListByFunc(this.files, searchFunction);
    }
}
