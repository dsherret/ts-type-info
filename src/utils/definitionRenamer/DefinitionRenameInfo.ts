import {FileDefinition, ModuleMemberDefinitions, GlobalDefinition, NamespaceDefinition} from "./../../definitions";

export class DefinitionRenameInfo {
    private fileAndNamespacesToDefinition: { file: FileDefinition; namespaces: NamespaceDefinition[]; };
    private oldName: string;

    constructor(private globalDef: GlobalDefinition, private definition: ModuleMemberDefinitions, private newName: string) {
        this.fileAndNamespacesToDefinition = globalDef.getFileAndNamespacesToDefinition(definition);
        this.oldName = this.definition.name;
    }

    getOldName() {
        return this.oldName;
    }

    getNewName() {
        return this.newName;
    }

    getSearchingForDefinitionName() {
        if (this.hasNamespaces()) {
            return this.fileAndNamespacesToDefinition.namespaces[0].name;
        }
        else {
            return this.definition.name;
        }
    }

    hasNamespaces() {
        return this.fileAndNamespacesToDefinition.namespaces.length > 0;
    }

    getFile() {
        return this.fileAndNamespacesToDefinition.file;
    }

    getExportDefinitionOfFile() {
        if (this.fileAndNamespacesToDefinition.namespaces.length > 0) {
            return this.fileAndNamespacesToDefinition.namespaces[0];
        }
        else {
            return this.definition;
        }
    }

    getModuleSpecifierFromFile(file: FileDefinition) {
        return file.getModuleSpecifierToFile(this.fileAndNamespacesToDefinition.file);
    }

    getNameWithNamespaces(name: string, firstNamespaceName?: string) {
        let newName = "";

        if (this.fileAndNamespacesToDefinition.namespaces.length > 0) {
            const names = this.fileAndNamespacesToDefinition.namespaces.map(n => n.name);
            if (firstNamespaceName != null) {
                names[0] = firstNamespaceName;
            }

            newName += names.join(".") + ".";
        }

        return newName + name;
    }
}
