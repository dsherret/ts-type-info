import {ISourceFileChild} from "./../source-file-child";
import {ISourceFile} from "./../source-file";

export class StructureSourceFileChildBase implements ISourceFileChild {
    getSourceFile(): ISourceFile {
        return null;
    }
}
