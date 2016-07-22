import {FileDefinition} from "./../../definitions";
import {RenameInfo} from "./RenameInfo";

// todo: split up
export function getRenameInfosFromImports(opts: { exportedRenameInfos: RenameInfo[]; searchingModuleSpecifier: string; file: FileDefinition; }) {
    const {exportedRenameInfos, searchingModuleSpecifier, file} = opts;
    const importedRenameInfos: RenameInfo[] = [];
    const validExportedRenameInfos = exportedRenameInfos.filter(i => !i.isRootDefaultExportOfFile() || i.hasNamespaces());

    file.imports.forEach(importDef => {
        // todo: better module specifier matching check
        if (searchingModuleSpecifier === importDef.moduleSpecifier) {
            validExportedRenameInfos.forEach(renameInfo => {
                if (importDef.defaultImport != null) {
                    const defaultImportName = importDef.defaultImport.importName;
                    if (defaultImportName != null && renameInfo.hasNamespaces() && renameInfo.isRootDefaultExportOfFile()) {
                        importedRenameInfos.push(renameInfo.createWithNewFirstNamespace(defaultImportName));
                    }
                }

                if (importDef.starImportName != null && !renameInfo.isRootDefaultExportOfFile()) {
                    importedRenameInfos.push(renameInfo.createWithPrependedNamespace(importDef.starImportName));
                }

                importDef.namedImports.forEach(named => {
                    named.definitions.forEach(def => {
                        if (def.name === renameInfo.getRootName()) {
                            const hasAlias = named.importName !== renameInfo.getRootName();

                            if (hasAlias || renameInfo.isRootDefaultExportOfFile()) {
                                const shouldHandleAlias = renameInfo.hasNamespaces();

                                if (shouldHandleAlias) {
                                    importedRenameInfos.push(renameInfo.createWithNewFirstNamespace(named.importName));
                                }
                            }
                            else {
                                importedRenameInfos.push(renameInfo.createCopy());
                            }
                        }
                    });
                });
            });
        }
    });

    return importedRenameInfos;
}
