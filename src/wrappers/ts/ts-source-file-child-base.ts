import * as ts from "typescript";
import {TsTypeChecker} from "./utils/ts-type-checker";
import {TsCache} from "./utils/ts-cache";
import {TsBaseOptions, TsBase} from "./ts-base";
import {TsSourceFile} from "./ts-source-file";
import {ISourceFile} from "./../source-file";
import {ISourceFileChildBase} from "./../source-file-child-base";

export interface TsSourceFileChildBaseOptions extends TsBaseOptions {
    tsSourceFile: TsSourceFile;
}

export class TsSourceFileChildBase extends TsBase implements ISourceFileChildBase {
    protected tsSourceFile: TsSourceFile;

    constructor(opts: TsSourceFileChildBaseOptions) {
        super(opts);

        this.tsSourceFile = opts.tsSourceFile;
    }

    getSourceFile(): ISourceFile {
        return this.tsSourceFile;
    }
}
