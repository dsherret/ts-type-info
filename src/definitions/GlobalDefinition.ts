import {ModuledDefinition, ClassDefinition, FunctionDefinition, NamespaceDefinition, EnumDefinition, TypeAliasDefinition,
    VariableDefinition} from "./../definitions";
import {StructureFactory} from "./../factories";
import {FileStructure} from "./../structures";
import {DefinitionUtils, StringUtils} from "./../utils";
import {FileDefinition} from "./file";

type SearchDefinitions = ClassDefinition | EnumDefinition | FunctionDefinition | NamespaceDefinition | TypeAliasDefinition | VariableDefinition;

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

    getPathToDefinition(def: SearchDefinitions) {
        for (let i = 0; i < this.files.length; i++) {
            let namespaces = this.getNamespacesToDefinitionInModule(def, this.files[i], []);
            if (namespaces != null) {
                return {
                    file: this.files[i],
                    namespaces: namespaces
                };
            }
        }

        return null;
    }

    private getNamespacesToDefinitionInModule(def: SearchDefinitions, moduleDef: ModuledDefinition, currentPath: NamespaceDefinition[]): NamespaceDefinition[] {
        const foundInModule = moduleDef.contains(def);

        if (foundInModule) {
            return currentPath;
        }
        else {
            for (let i = 0; i < moduleDef.namespaces.length; i++) {
                let path = this.getNamespacesToDefinitionInModule(def, moduleDef.namespaces[i], [...currentPath, moduleDef.namespaces[i]]);
                if (path != null) {
                    return path;
                }
            }
        }

        return null;
    }
}
