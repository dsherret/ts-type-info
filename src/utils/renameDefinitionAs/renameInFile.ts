import {FileDefinition} from "./../../definitions";
import {RenameInfo} from "./RenameInfo";
import {renameInModule} from "./renameInModule";

export function renameInFile(fileRenameInfos: RenameInfo[], file: FileDefinition) {
    renameInModule(fileRenameInfos, file);
}
