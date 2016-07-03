import {ModuleMemberDefinitions, GlobalDefinition} from "./../definitions";
import {DefinitionRenameInfo} from "./definitionRenamer/DefinitionRenameInfo";
import {FileAnalyzer} from "./definitionRenamer/FileAnalyzer";
import {DefinitionInFileRenamer} from "./definitionRenamer/DefinitionInFileRenamer";

export class DefinitionRenamer {
    constructor(private globalDef: GlobalDefinition) {
    }

    renameDefinitionAs(definition: ModuleMemberDefinitions, newName: string) {
        const definitionRenameInfo = new DefinitionRenameInfo(this.globalDef, definition, newName);
        const fileAnalyzer = new FileAnalyzer(definitionRenameInfo);

        this.globalDef.files.forEach(file => {
            const fileRenamer = new DefinitionInFileRenamer(file);
            const renameInfos = fileAnalyzer.getRenameInfosFromFile(file);

            fileRenamer.rename(renameInfos);
        });

        definition.name = newName;
    }
}
