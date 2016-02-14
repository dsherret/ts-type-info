import * as ts from "typescript";
import {TypeChecker} from "./../utils/type-checker";

export interface BaseWrappedTypeOptions {
    typeChecker: TypeChecker;
    sourceFile: ts.SourceFile;
}

export class BaseWrappedType {
    protected sourceFile: ts.SourceFile;
    protected typeChecker: TypeChecker;

    constructor(opts: BaseWrappedTypeOptions) {
        this.typeChecker = opts.typeChecker;
        this.sourceFile = opts.sourceFile;
    }

    getSourceFile() {
        return this.sourceFile;
    }
}
