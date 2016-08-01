import * as ts from "typescript";
import {TsTypeChecker} from "./utils/TsTypeChecker";
import {TsCache} from "./utils/TsCache";

export interface TsBaseOptions {
    typeChecker: TsTypeChecker;
    sourceFile: ts.SourceFile;
    tsCache: TsCache;
}

export class TsBase {
    protected readonly sourceFile: ts.SourceFile;
    protected readonly typeChecker: TsTypeChecker;
    protected readonly tsCache: TsCache;

    constructor(opts: TsBaseOptions) {
        this.typeChecker = opts.typeChecker;
        this.sourceFile = opts.sourceFile;
        this.tsCache = opts.tsCache;
    }
}
