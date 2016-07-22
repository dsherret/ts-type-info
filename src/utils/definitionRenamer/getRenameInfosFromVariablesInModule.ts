import {ModuledDefinition} from "./../../definitions";
import {RenameInfo} from "./RenameInfo";

export function getRenameInfosFromVariablesInModule(opts: { moduleDef: ModuledDefinition; currentRenameInfos: RenameInfo[]; }) {
    const {moduleDef, currentRenameInfos} = opts;
    const newRenameInfos: RenameInfo[] = [];

    moduleDef.variables.forEach(varDef => {
        const allRenameInfos = [...currentRenameInfos, ...newRenameInfos];

        allRenameInfos.forEach(renameInfo => {
            const typeName = varDef.type.text.substr("typeof ".length);

            if (varDef.type.text.indexOf("typeof ") === 0 && renameInfo.fullNameFrom.indexOf(typeName + ".") === 0) {
                const replace = (name: string) => varDef.name + name.substr(typeName.length);

                newRenameInfos.push(new RenameInfo({
                    fullNameFrom: replace(renameInfo.fullNameFrom),
                    fullNameTo: replace(renameInfo.fullNameTo)
                }));
            }
        });
    });

    return newRenameInfos;
}
