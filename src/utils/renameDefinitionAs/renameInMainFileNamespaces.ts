import {NamespaceDefinition} from "./../../definitions";
import {RenameInfo} from "./RenameInfo";
import {ModuleBodyRenamer} from "./ModuleBodyRenamer";
import {getRenameInfosFromVariablesInModule} from "./getRenameInfosFromVariablesInModule";
import {renameInModule} from "./renameInModule";

export function renameInMainFileNamespaces(renameInfo: RenameInfo, namespaces: NamespaceDefinition[]) {
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
