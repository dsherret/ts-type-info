import {FileDefinition} from "./../../definitions";
import {RenameInfo} from "./RenameInfo";

export function renameImportsInFile(opts: { exportedRenameInfos: RenameInfo[]; searchingModuleSpecifier: string; fileTo: FileDefinition; }) {
    const {exportedRenameInfos, searchingModuleSpecifier, fileTo} = opts;
    const renameInfos = exportedRenameInfos.filter(i => !i.isRootDefaultExportOfFile() && !i.hasNamespaces());
    const matchingImports = fileTo.imports.filter(i => i.moduleSpecifier === searchingModuleSpecifier);

    matchingImports.forEach(importDef => {
        renameInfos.forEach(renameInfo => {
            importDef.namedImports.forEach(named => {
                if (named.name === renameInfo.fullNameFrom) {
                    named.name = renameInfo.getRootNameTo();
                }
            });
        });
    });
}
