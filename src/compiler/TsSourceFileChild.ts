import {TsBaseOptions, TsBase} from "./TsBase";
import {TsSourceFile} from "./TsSourceFile";

export interface TsSourceFileChildOptions extends TsBaseOptions {
    tsSourceFile: TsSourceFile;
}

export class TsSourceFileChild extends TsBase {
    protected readonly tsSourceFile: TsSourceFile;

    constructor(opts: TsSourceFileChildOptions) {
        super(opts);
        this.tsSourceFile = opts.tsSourceFile;
    }
}
