import {NamedImportPartDefinition} from "./../../definitions";
import {RenameInfo} from "./RenameInfo";

export function getRenameInfosFromNamedImportPart(opts: { currentRenameInfo: RenameInfo; namedImportPart: NamedImportPartDefinition; }) {
    const {currentRenameInfo, namedImportPart} = opts;

    if (currentRenameInfo.getRootNameFrom() === namedImportPart.name) {
        const hasAlias = namedImportPart.alias != null && namedImportPart.name !== namedImportPart.alias;

        if (hasAlias && currentRenameInfo.hasNamespaces()) {
            return [currentRenameInfo.createWithNewFirstNamespace(namedImportPart!.alias!)];
        }
        else if (!hasAlias) {
            return [currentRenameInfo.createCopy()];
        }
    }

    return [];
}
