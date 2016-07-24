import {FileDefinition} from "./../../definitions";
import {RenameInfo} from "./RenameInfo";
import {getRenameInfosFromNamedImportPart} from "./getRenameInfosFromNamedImportPart";

export function getRenameInfosFromReExports(opts: { exportedRenameInfos: RenameInfo[]; searchingModuleSpecifier: string; file: FileDefinition; }) {
    const {exportedRenameInfos, searchingModuleSpecifier, file} = opts;
    const matchingReExports = file.reExports.filter(e => e.moduleSpecifier === searchingModuleSpecifier);
    const renameInfos: RenameInfo[] = [];

    matchingReExports.forEach(reExportDef => {
        if (reExportDef.namedExports.length > 0) {
            reExportDef.namedExports.forEach(namedReExport => {
                exportedRenameInfos.forEach(renameInfo => {
                    renameInfos.push(...getRenameInfosFromNamedImportPart({
                        currentRenameInfo: renameInfo,
                        namedImportPart: namedReExport
                    }));
                });
            });
        }
        else {
            renameInfos.push(...exportedRenameInfos.filter(i => !i.isRootDefaultExportOfFile()));
        }
    });

    return renameInfos;
}
