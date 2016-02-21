import {ISourceFile} from "./source-file";

// TODO-CHANGE: Rename to something better
export interface ISourceFileChildBase {
    getSourceFile(): ISourceFile;
}
