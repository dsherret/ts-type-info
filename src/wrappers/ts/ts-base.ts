import * as ts from "typescript";
import {TsTypeChecker} from "./utils/ts-type-checker";
import {TsCache} from "./utils/ts-cache";

export interface TsBaseOptions {
    typeChecker: TsTypeChecker;
    sourceFile: ts.SourceFile;
    tsCache: TsCache;
}

export class TsBase {
    protected sourceFile: ts.SourceFile;
    protected typeChecker: TsTypeChecker;
    protected tsCache: TsCache;

    constructor(opts: TsBaseOptions) {
        this.typeChecker = opts.typeChecker;
        this.sourceFile = opts.sourceFile;
        this.tsCache = opts.tsCache;
    }
}
