import {ModuleMemberDefinitions, GlobalDefinition} from "./../definitions";
import {DefinitionRenameInfo} from "./definitionRenamer/DefinitionRenameInfo";
import {FileAnalyzer} from "./definitionRenamer/FileAnalyzer";
import {DefinitionInFileRenamer} from "./definitionRenamer/DefinitionInFileRenamer";
import {FilesExportingDefinitionSearcher} from "./definitionRenamer/FilesExportingDefinitionSearcher";

export class DefinitionRenamer {
    constructor(private globalDef: GlobalDefinition) {
    }

    renameDefinitionAs(definition: ModuleMemberDefinitions, newName: string) {
        const filesExportingDefinitionSearcher = new FilesExportingDefinitionSearcher(this.globalDef);
        const definitionRenameInfo = new DefinitionRenameInfo(this.globalDef, definition, newName, filesExportingDefinitionSearcher.getFilesExportingDefinition(definition));
        const fileAnalyzer = new FileAnalyzer(definitionRenameInfo);

        this.globalDef.files.forEach(file => {
            const fileRenamer = new DefinitionInFileRenamer(file);
            const renameInfos = fileAnalyzer.getRenameInfosFromFile(file);

            fileRenamer.rename(renameInfos);
        });

        definition.name = newName;
    }
}
