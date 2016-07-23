import {ModuledDefinition} from "./../../definitions";
import {RenameInfo} from "./RenameInfo";
import {ModuleBodyRenamer} from "./ModuleBodyRenamer";
import {getRenameInfosFromVariablesInModule} from "./getRenameInfosFromVariablesInModule";

export function renameInModule(renameInfos: RenameInfo[], moduleDef: ModuledDefinition) {
    renameInfos = [...renameInfos, ...getRenameInfosFromVariablesInModule({
        moduleDef,
        currentRenameInfos: renameInfos
    })];

    renameInfos.forEach(info => ModuleBodyRenamer.renameInModule(info, moduleDef));

    moduleDef.namespaces.forEach(namespaceDef => {
        renameInModule(renameInfos, namespaceDef);
    });
}
