import {FileDefinition, NamedDefinition, OptionallyNamedDefinition, TypeDefinition, ModuledDefinition} from "./../definitions";
import {StructureFactory} from "./../factories";

export class DefinitionUtils {
    static getTypeDefinitionFromTextOrDefinition(textOrDefinition: string | NamedDefinition, typeArguments: string[]) {
        const structureFactory = new StructureFactory();
        let def: TypeDefinition;

        if (typeof textOrDefinition === "string") {
            def = structureFactory.getTypeFromText(textOrDefinition);
        }
        else if (textOrDefinition == null) {
            def = structureFactory.getTypeFromText("any");
        }
        else {
            def = structureFactory.getTypeFromDefinitionAndTypeArguments(textOrDefinition, typeArguments)!;
        }

        return def;
    }

    static getNextOrderOfModule(def: ModuledDefinition) {
        let maxOrder = -1;
        def.getMembers().forEach(m => maxOrder = Math.max(m.order, maxOrder));
        return maxOrder + 1;
    }

    static isDefinitionFile(def: FileDefinition) {
        const definitionFileExt = ".d.ts";
        const fileName = def.fileName || "";
        return fileName.lastIndexOf(definitionFileExt) === fileName.length - definitionFileExt.length;
    }

    static getDefinitionFromListByNameOrFunc<T extends NamedDefinition | OptionallyNamedDefinition>(list: T[], nameOrFunc: string | ((item: T) => boolean)): T | null {
        const func = DefinitionUtils.getFuncFromNameOrFunc(nameOrFunc);
        return DefinitionUtils.getDefinitionFromListByFunc(list, func);
    }

    static getDefinitionFromListByFunc<T>(list: T[], func: ((item: T) => boolean)): T | null {
        let def: T | null = null;

        for (let i = 0, l = list.length; i < l; i++) {
            if (func(list[i])) {
                def = list[i];
                break;
            }
        }

        return def;
    }

    private static getFuncFromNameOrFunc<T extends NamedDefinition | OptionallyNamedDefinition>(nameOrFunc: string | ((item: T) => boolean)) {
        let func = nameOrFunc as (def: T) => boolean;

        if (typeof nameOrFunc === "string") {
            func = (d) => d.name === nameOrFunc;
        }

        return func;
    }
}
