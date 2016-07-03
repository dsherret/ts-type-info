import {FileDefinition, ModuledDefinition} from "./../../definitions";
import {RenameInfo} from "./RenameInfo";
import {VariableAnalyzer} from "./VariableAnalyzer";
import {ModuleBodyRenamer} from "./ModuleBodyRenamer";

export class DefinitionInFileRenamer {
    constructor(private file: FileDefinition) {
    }

    rename(renameInfos: RenameInfo[]) {
        this.renameInModule(this.file, renameInfos);
    }

    private renameInModule(moduleDef: ModuledDefinition, renameInfos: RenameInfo[]) {
        const variableAnalyzer = new VariableAnalyzer(renameInfos);
        renameInfos.push(...variableAnalyzer.getRenameInfosFromVariablesInModule(moduleDef));

        renameInfos.forEach(renameInfo => {
            ModuleBodyRenamer.renameInModule(renameInfo, moduleDef);
        });

        moduleDef.namespaces.forEach(namespaceDef => {
            this.renameInModule(namespaceDef, renameInfos);
        });
    }
}
