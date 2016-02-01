import {AllDefinitions, FileDefinition, InterfaceDefinition} from "./../definitions";

export class DefinitionUtils {
    static isInterfaceInAmbientContext(definition: InterfaceDefinition) {
        const parent = definition.parent;

        if (DefinitionUtils.isFileDefinition(parent)) {
            return DefinitionUtils.isDefinitionFile(parent);
        }
        else {
            return parent.isAmbient;
        }
    }

    static isInterfaceDefinition(def: AllDefinitions): def is InterfaceDefinition {
        return def instanceof InterfaceDefinition;
    }

    static isFileDefinition(def: AllDefinitions): def is FileDefinition {
        return (def as FileDefinition).fileName !== null;
    }

    static isDefinitionFile(def: FileDefinition) {
        const definitionFileExt = ".d.ts";
        return def.fileName.lastIndexOf(definitionFileExt) === def.fileName.length - definitionFileExt.length;
    }
}
