import {FileDefinition} from "./../../definitions";
import {DefinitionRenameInfo} from "./DefinitionRenameInfo";

export class FileImportsRenamer {
    constructor(private file: FileDefinition, private renameInfo: DefinitionRenameInfo) {
    }

    renameImports() {
        if (this.renameInfo.getExportDefinitionOfFile().isDefaultExportOfFile || this.renameInfo.hasNamespaces()) {
            return;
        }

        const searchingModuleSpecifier = this.renameInfo.getModuleSpecifierFromFile(this.file);

        this.file.imports.filter(i => i.moduleSpecifier === searchingModuleSpecifier).forEach(importDef => {
            importDef.namedImports.forEach(named => {
                named.definitions.forEach(def => {
                    if (def.name === this.renameInfo.getSearchingForDefinitionName()) {
                        const hasAlias = named.importName !== this.renameInfo.getOldName();

                        if (!hasAlias) {
                            def.name = this.renameInfo.getNewName();
                        }
                        else if (named.definitions.length > 0) {
                            named.definitions[0].name = this.renameInfo.getNewName();
                        }
                    }
                });
            });
        });
    }
}
