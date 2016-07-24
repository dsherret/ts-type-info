import {FileDefinition} from "./../../definitions";
import {RenameInfo} from "./RenameInfo";

export function renameReExportsInFile(opts: { exportedRenameInfos: RenameInfo[]; searchingModuleSpecifier: string; fileTo: FileDefinition; }) {
    const {exportedRenameInfos, searchingModuleSpecifier, fileTo} = opts;
    const matchingReExports = fileTo.reExports.filter(i => i.moduleSpecifier === searchingModuleSpecifier);
    const validExportedRenameInfos = exportedRenameInfos.filter(i => !i.isRootDefaultExportOfFile() && !i.hasNamespaces());

    matchingReExports.forEach(reExportDef => {
        if (reExportDef.namedExports.length > 0) {
            reExportDef.namedExports.forEach(named => {
                validExportedRenameInfos.forEach(renameInfo => {
                    if (renameInfo.getRootNameFrom() === named.name) {
                        named.name = renameInfo.getRootNameTo()
                    }
                });
            });
        }
    });
}
