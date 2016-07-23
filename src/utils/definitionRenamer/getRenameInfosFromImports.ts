import {FileDefinition} from "./../../definitions";
import {RenameInfo} from "./RenameInfo";
import {getRenameInfosFromImportReExportPart} from "./getRenameInfosFromImportReExportPart";

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
                    importedRenameInfos.push(...getRenameInfosFromImportReExportPart({
                        currentRenameInfo: renameInfo,
                        importReExportPart: named
                    }));
                });
            });
        }
    });

    return importedRenameInfos;
}
