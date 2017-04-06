import {GlobalDefinition, FileDefinition} from "./../../definitions";
import {RenameInfo} from "./RenameInfo";
import {getRenameInfosFromImports} from "./getRenameInfosFromImports";
import {getRenameInfosFromVariablesInModule} from "./getRenameInfosFromVariablesInModule";
import {getRenameInfosFromDefaultExport} from "./getRenameInfosFromDefaultExport";
import {getRenameInfosFromReExports} from "./getRenameInfosFromReExports";
import {renameInFile} from "./renameInFile";
import {renameImportsInFile} from "./renameImportsInFile";
import {renameReExportsInFile} from "./renameReExportsInFile";

export function renameInGlobalForExternalModules(opts: { exportedRenameInfos: RenameInfo[]; exportedFile: FileDefinition; globalDef: GlobalDefinition; }) {
    const {exportedRenameInfos, exportedFile, globalDef} = opts;

    globalDef.files.filter(f => f !== exportedFile).forEach(f => {
        const searchingModuleSpecifier = f.getModuleSpecifierToFile(exportedFile);
        const importedRenameInfos = getRenameInfosFromImports({
            exportedRenameInfos,
            file: f,
            searchingModuleSpecifier
        });
        const fileLocalRenameInfos = [...importedRenameInfos, ...getRenameInfosFromVariablesInModule({
            moduleDef: exportedFile,
            currentRenameInfos: importedRenameInfos
        })];
        const newExportedRenameInfos = [
            ...getRenameInfosFromDefaultExport({ currentRenameInfos: fileLocalRenameInfos, file: f }),
            ...getRenameInfosFromReExports({ exportedRenameInfos, file: f, searchingModuleSpecifier })
        ];

        renameImportsInFile({
            exportedRenameInfos,
            searchingModuleSpecifier,
            fileTo: f
        });
        renameReExportsInFile({
            exportedRenameInfos,
            searchingModuleSpecifier,
            fileTo: f
        });
        renameInFile(importedRenameInfos, f);

        if (newExportedRenameInfos.length > 0) {
            renameInGlobalForExternalModules({
                exportedRenameInfos: newExportedRenameInfos,
                exportedFile: f,
                globalDef
            });
        }
    });
}
