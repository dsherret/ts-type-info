import {FileDefinition} from "./../../definitions";
import {RenameInfo} from "./RenameInfo";

export function renameImportsInFile(opts: { exportedRenameInfos: RenameInfo[]; searchingModuleSpecifier: string; fileTo: FileDefinition; }) {
    const {exportedRenameInfos, searchingModuleSpecifier, fileTo} = opts;
    const renameInfos = exportedRenameInfos.filter(i => !i.isRootDefaultExportOfFile() && !i.hasNamespaces());
    const matchingImports = fileTo.imports.filter(i => i.moduleSpecifier === searchingModuleSpecifier);

    matchingImports.forEach(importDef => {
        renameInfos.forEach(renameInfo => {
            importDef.namedImports.forEach(named => {
                named.definitions.forEach(def => {
                    if (def.name === renameInfo.fullNameFrom) {
                        const hasAlias = named.importName !== renameInfo.fullNameFrom;

                        if (!hasAlias) {
                            def.name = renameInfo.fullNameTo;
                        }
                        else if (named.definitions.length > 0) {
                            named.definitions[0].name = renameInfo.fullNameTo;
                        }
                    }
                });
            });
        });
    });
}
