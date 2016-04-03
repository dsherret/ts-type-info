import {FileDefinition} from "./../definitions";

export class DefinitionUtils {
    static isDefinitionFile(def: FileDefinition) {
        const definitionFileExt = ".d.ts";
        return def.fileName.lastIndexOf(definitionFileExt) === def.fileName.length - definitionFileExt.length;
    }
}
