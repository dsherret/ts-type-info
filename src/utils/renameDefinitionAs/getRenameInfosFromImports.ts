import {FileDefinition} from "./../../definitions";
import {RenameInfo} from "./RenameInfo";
import {getRenameInfosFromNamedImportPart} from "./getRenameInfosFromNamedImportPart";

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
                    const defaultImportName = importDef.defaultImport.name;

                    if (defaultImportName != null && renameInfo.hasNamespaces() && renameInfo.isRootDefaultExportOfFile()) {
                        importedRenameInfos.push(renameInfo.createWithNewFirstNamespace(defaultImportName));
                    }
                }

                if (importDef.starImportName != null && !renameInfo.isRootDefaultExportOfFile()) {
                    importedRenameInfos.push(renameInfo.createWithPrependedNamespace(importDef.starImportName));
                }

                importDef.namedImports.forEach(named => {
                    importedRenameInfos.push(...getRenameInfosFromNamedImportPart({
                        currentRenameInfo: renameInfo,
                        namedImportPart: named
                    }));
                });
            });
        }
    });

    return importedRenameInfos;
}
