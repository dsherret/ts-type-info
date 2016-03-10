import {TsBaseOptions, TsBase} from "./TsBase";
import {TsSourceFile} from "./TsSourceFile";
import {ISourceFile} from "./../ISourceFile";
import {ISourceFileChild} from "./../ISourceFileChild";

export interface TsSourceFileChildOptions extends TsBaseOptions {
    tsSourceFile: TsSourceFile;
}

export class TsSourceFileChild extends TsBase implements ISourceFileChild {
    protected tsSourceFile: TsSourceFile;

    constructor(opts: TsSourceFileChildOptions) {
        super(opts);

        this.tsSourceFile = opts.tsSourceFile;
    }

    getSourceFile(): ISourceFile {
        return this.tsSourceFile;
    }
}
