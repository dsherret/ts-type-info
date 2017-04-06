import {ModuleMemberDefinitions, GlobalDefinition} from "./../../definitions";
import {RenameInfo} from "./RenameInfo";
import {getRenameInfosFromVariablesInModule} from "./getRenameInfosFromVariablesInModule";
import {getRenameInfosFromDefaultExport} from "./getRenameInfosFromDefaultExport";
import {renameInFile} from "./renameInFile";
import {renameInGlobalForExternalModules} from "./renameInGlobalForExternalModules";
import {renameInMainFileNamespaces} from "./renameInMainFileNamespaces";

export function renameDefinitionAs(opts: { globalDef: GlobalDefinition; definition: ModuleMemberDefinitions; newName: string; }) {
    const {globalDef, definition, newName} = opts;
    const fileAndNamespaces = globalDef.getFileAndNamespacesToDefinition(definition);

    if (fileAndNamespaces == null) {
        return;
    }

    const {file: mainFile, namespaces} = fileAndNamespaces;
    const renameInfo = RenameInfo.createFromNamespaces({ nameFrom: definition.name, nameTo: newName, namespaceNames: namespaces.map(n => n.name) });

    renameInMainFileNamespaces(renameInfo, namespaces);

    if (mainFile.imports.length === 0 && mainFile.getExports().length === 0 && mainFile.defaultExportExpression == null) {
        renameForInternalModules();
    }
    else {
        renameForExternalModules();
    }

    definition.name = newName;

    function renameForInternalModules() {
        const internalModuleFiles = globalDef.files.filter(f => f.imports.length === 0 && f.getExports().length === 0 && mainFile.defaultExportExpression == null);
        const renameInfos = [renameInfo];

        internalModuleFiles.forEach(file => {
            renameInfos.push(...getRenameInfosFromVariablesInModule({
                moduleDef: file,
                currentRenameInfos: renameInfos
            }));
        });

        internalModuleFiles.forEach(file => {
            renameInFile(renameInfos, file);
        });
    }

    function renameForExternalModules() {
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

        renameInFile([renameInfo], mainFile);
        renameInGlobalForExternalModules({
            exportedRenameInfos,
            exportedFile: mainFile,
            globalDef
        });
    }
}
