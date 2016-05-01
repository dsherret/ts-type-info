import {FileDefinition, NamedDefinition} from "./../definitions";

export class DefinitionUtils {
    static isDefinitionFile(def: FileDefinition) {
        const definitionFileExt = ".d.ts";
        const fileName = def.fileName || "";
        return fileName.lastIndexOf(definitionFileExt) === fileName.length - definitionFileExt.length;
    }

    static getDefinitionFromListByStrOrFunc<T extends NamedDefinition>(list: T[], nameOrFunc: string | ((item: T) => boolean)): T {
        const func = DefinitionUtils.getFuncFromNameOrFunc(nameOrFunc);
        return DefinitionUtils.getDefinitionFromListByFunc(list, func);
    }

    static getDefinitionFromListByFunc<T>(list: T[], func: ((item: T) => boolean)): T {
        let def: T = null;

        for (let i = 0, l = list.length; i < l; i++) {
            if (func(list[i])) {
                def = list[i];
                break;
            }
        }

        return def;
    }

    private static getFuncFromNameOrFunc<T extends NamedDefinition>(nameOrFunc: string | ((item: T) => boolean)) {
        let func = nameOrFunc as (def: T) => boolean;

        if (typeof nameOrFunc === "string") {
            func = (d) => d.name === nameOrFunc;
        }

        return func;
    }
}
