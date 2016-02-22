import {ISourceFile} from "./source-file";

export interface ISourceFileChild {
    getSourceFile(): ISourceFile;
}
