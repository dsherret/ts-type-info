import {FileDefinition, InterfaceDefinition} from "./../definitions";

export class DefinitionUtils {
    static isInterfaceInAmbientContext(definition: InterfaceDefinition) {
        const parent = definition.parent;

        if (parent.isFileDefinition()) {
            return DefinitionUtils.isDefinitionFile(parent);
        }
        else {
            return parent.isAmbient;
        }
    }

    private static isDefinitionFile(def: FileDefinition) {
        const definitionFileExt = ".d.ts";
        return def.fileName.lastIndexOf(definitionFileExt) === def.fileName.length - definitionFileExt.length;
    }
}
