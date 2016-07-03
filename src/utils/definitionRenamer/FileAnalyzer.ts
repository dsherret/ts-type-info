import {FileDefinition} from "./../../definitions";
import {DefinitionRenameInfo} from "./DefinitionRenameInfo";
import {RenameInfo} from "./RenameInfo";
import {FileImportsAnalyzer} from "./FileImportsAnalyzer";
import {FileImportsRenamer} from "./FileImportsRenamer";

export class FileAnalyzer {
    constructor(private renameInfo: DefinitionRenameInfo) {
    }

    getRenameInfosFromFile(file: FileDefinition) {
        const renameInfos: RenameInfo[] = [];

        if (file === this.renameInfo.getFile()) {
            renameInfos.push({
                fullName: this.renameInfo.getNameWithNamespaces(this.renameInfo.getOldName()),
                fullReplace: this.renameInfo.getNameWithNamespaces(this.renameInfo.getNewName())
            });
        }
        else {
            const importAnalyzer = new FileImportsAnalyzer(file, this.renameInfo);
            renameInfos.push(...importAnalyzer.getRenameInfosFromFile());
            const importRenamer = new FileImportsRenamer(file, this.renameInfo);
            importRenamer.renameImports();
        }

        return renameInfos;
    }
}
