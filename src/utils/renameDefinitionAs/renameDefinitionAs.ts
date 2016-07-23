import {ModuleMemberDefinitions, GlobalDefinition, NamespaceDefinition} from "./../../definitions";
import {RenameInfo} from "./RenameInfo";
import {ModuleBodyRenamer} from "./ModuleBodyRenamer";
import {getRenameInfosFromVariablesInModule} from "./getRenameInfosFromVariablesInModule";
import {getRenameInfosFromDefaultExport} from "./getRenameInfosFromDefaultExport";
import {renameInFile} from "./renameInFile";
import {renameInModule} from "./renameInModule";
import {renameInGlobal} from "./renameInGlobal";

export function renameDefinitionAs(opts: { globalDef: GlobalDefinition; definition: ModuleMemberDefinitions; newName: string; }) {
    const {globalDef, definition, newName} = opts;
    const fileAndNamespaces = globalDef.getFileAndNamespacesToDefinition(definition);

    if (fileAndNamespaces == null) {
        return;
    }

    const {file: mainFile, namespaces} = fileAndNamespaces;
    const renameInfo = RenameInfo.createFromNamespaces({ nameFrom: definition.name, nameTo: newName, namespaceNames: namespaces.map(n => n.name) });
    const fileLocalRenameInfos = getRenameInfosFromVariablesInModule({
        moduleDef: mainFile,
        currentRenameInfos: [renameInfo]
    });
    const exportedRenameInfos = getRenameInfosFromDefaultExport({
        currentRenameInfos: [renameInfo, ...fileLocalRenameInfos],
        file: mainFile
    });

    if (namespaces.length > 0 && namespaces[0].isNamedExportOfFile || definition.isNamedExportOfFile) {
        exportedRenameInfos.push(renameInfo);
    }

    renameInMainFileNamespaces(renameInfo, namespaces);
    renameInFile([renameInfo], mainFile);
    renameInGlobal({
        exportedRenameInfos,
        exportedFile: mainFile,
        globalDef
    });

    definition.name = newName;
}

function renameInMainFileNamespaces(renameInfo: RenameInfo, namespaces: NamespaceDefinition[]) {
    let renameInfos: RenameInfo[] = [renameInfo];

    namespaces.forEach((namespaceDef, i) => {
        renameInfos.push(renameInfo.createWithoutFirstXNamespaces(i + 1));
        renameInfos.push(...getRenameInfosFromVariablesInModule({
            moduleDef: namespaceDef,
            currentRenameInfos: renameInfos
        }));

        const nextNamespace = i + 1 < namespaces.length ? namespaces[i + 1] : null;

        renameInfos.forEach(info => {
            ModuleBodyRenamer.renameInModule(info, namespaceDef);
            namespaceDef.namespaces.filter(n => n !== nextNamespace).forEach(childNamespaceDef => {
                renameInModule(renameInfos, childNamespaceDef);
            });
        });
    });
}
