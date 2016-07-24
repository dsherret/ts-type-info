import {FileDefinition, ImportPartDefinition, ReExportPartDefinition} from "./../../definitions";
import {RenameInfo} from "./RenameInfo";

export function getRenameInfosFromImportReExportPart(opts: { currentRenameInfo: RenameInfo; importReExportPart: ImportPartDefinition | ReExportPartDefinition; }) {
    const {currentRenameInfo, importReExportPart} = opts;
    const importExportName = importReExportPart.isImportPartDefinition() ? importReExportPart.importName : importReExportPart.exportName;
    const isDefaultExport = importReExportPart.definitions.length > 0 && importReExportPart.definitions.some(d => d.isDefaultExportOfFile);
    const partName = importReExportPart.definitions.length > 0 ? importReExportPart.definitions[0].name : importExportName;

    if (currentRenameInfo.getRootNameFrom() === partName || currentRenameInfo.isRootDefaultExportOfFile() && isDefaultExport) {
        const hasAlias = importExportName !== currentRenameInfo.getRootNameFrom() || isDefaultExport;

        if (hasAlias && currentRenameInfo.hasNamespaces()) {
            return [currentRenameInfo.createWithNewFirstNamespace(importExportName)];
        }
        else if (!hasAlias) {
            return [currentRenameInfo.createCopy()];
        }
    }

    return [];
}
