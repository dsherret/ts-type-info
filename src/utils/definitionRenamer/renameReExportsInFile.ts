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
                    const partName = named.definitions.length > 0 ? named.definitions[0].name : named.exportName;

                    if (this.exportDef.name === partName) {
                        const hasAlias = partName !== named.exportName;

                        if (!hasAlias) {
                            named.exportName = renameInfo.fullNameTo;
                        }
                        else if (named.definitions.length > 0) {
                            named.definitions[0].name = renameInfo.fullNameTo;
                        }
                    }
                });
            });
        }
    });
}
