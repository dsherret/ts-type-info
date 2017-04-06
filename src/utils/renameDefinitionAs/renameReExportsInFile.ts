import {FileDefinition} from "./../../definitions";
import {RenameInfo} from "./RenameInfo";

export function renameReExportsInFile(opts: { exportedRenameInfos: RenameInfo[]; searchingModuleSpecifier: string; fileTo: FileDefinition; }) {
    const {exportedRenameInfos, searchingModuleSpecifier, fileTo} = opts;
    const matchingReExports = fileTo.reExports.filter(i => i.moduleSpecifier === searchingModuleSpecifier);
    const validExportedRenameInfos = exportedRenameInfos.filter(i => !i.isRootDefaultExportOfFile() && !i.hasNamespaces());

    matchingReExports.forEach(reExportDef => {
        validExportedRenameInfos.forEach(renameInfo => {
            reExportDef.namedExports.forEach(named => {
                if (renameInfo.getRootNameFrom() === named.name) {
                    named.name = renameInfo.getRootNameTo();
                }
            });
        });
    });
}
