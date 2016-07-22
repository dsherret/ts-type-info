import {RenameInfo} from "./RenameInfo";
import {FileDefinition} from "./../../definitions";
import {indexOfAllDefinitionsInText} from "./indexOfAllDefinitionsInText";

// todo: split this up

export function getRenameInfosFromDefaultExport(opts: { currentRenameInfos: RenameInfo[]; file: FileDefinition; }) {
    const {file, currentRenameInfos} = opts;
    const renameInfos: RenameInfo[] = [];

    if (file.defaultExportExpression != null) {
        currentRenameInfos.filter(i => i.hasNamespaces()).forEach(renameInfo => {
            const indexOfFullName = indexOfAllDefinitionsInText(file.defaultExportExpression.text, renameInfo.fullNameFrom);
            const isDefinitionDefaultExported = indexOfFullName.length === 1;

            if (!isDefinitionDefaultExported) {
                const numberNamespaces = renameInfo.getNumberOfNamespaces();

                for (let i = numberNamespaces; i > 0; i--) {
                    const namespaceName = renameInfo.getFirstXNamespacesFromFullName(numberNamespaces);
                    const indexesOfNamespace = indexOfAllDefinitionsInText(file.defaultExportExpression.text, namespaceName);
                    const namespaceInDefaultExport = indexesOfNamespace.length === 1 && indexesOfNamespace[0] === 0;

                    if (namespaceInDefaultExport) {
                        renameInfos.push(new RenameInfo({
                            fullNameFrom: "default." + renameInfo.getFullNameParts().filter((p, i) => i >= numberNamespaces).join("."),
                            fullNameTo: "default." + renameInfo.getFullReplaceParts().filter((p, i) => i >= numberNamespaces).join(".")
                        }));
                        break;
                    }
                }
            }
        });
    }

    return renameInfos;
}
