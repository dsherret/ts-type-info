import {ModuledDefinition} from "./../../definitions";
import {RenameInfo} from "./RenameInfo";

export class VariableAnalyzer {
    constructor(private renameInfos: RenameInfo[]) {
    }

    getRenameInfosFromVariablesInModule(moduleDef: ModuledDefinition) {
        const varsWithDefaultExpression = moduleDef.variables.filter(v => v.defaultExpression != null);
        const newRenameInfos: RenameInfo[] = [];

        varsWithDefaultExpression.forEach(varDef => {
            const allRenameInfos = [...this.renameInfos, ...newRenameInfos];

            allRenameInfos.forEach(renameInfo => {
                const typeName = varDef.type.text.substr("typeof ".length);

                if (varDef.type.text.indexOf("typeof ") === 0 && renameInfo.fullName.indexOf(typeName + ".") === 0) {
                    const nameToReplace = varDef.name + renameInfo.fullName.substr(typeName.length);
                    const nameToReplaceWith = varDef.name + renameInfo.fullReplace.substr(typeName.length);

                    newRenameInfos.push({
                        fullName: nameToReplace,
                        fullReplace: nameToReplaceWith
                    });
                }
            });
        });

        return newRenameInfos;
    }
}
