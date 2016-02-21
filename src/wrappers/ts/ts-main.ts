import * as ts from "typescript";
import * as path from "path";
import {Options, CompilerOptions} from "./../../options";
import {TsTypeChecker} from "./utils/ts-type-checker";
import {TsCache} from "./utils/ts-cache";
import {ISourceFile} from "./../source-file";
import {TsSourceFile} from "./ts-source-file";

export class TsMain {
    private sourceFiles: ISourceFile[];
    private tsCache = new TsCache();

    constructor(fileNames: string[], private options: Options) {
        const compilerOptions = this.getTsCompilerOptions(options.compilerOptions);
        const host = ts.createCompilerHost(compilerOptions);
        const program = ts.createProgram(fileNames, compilerOptions, host);
        const typeChecker = new TsTypeChecker(program.getTypeChecker());

        this.sourceFiles = program.getSourceFiles().filter(file => {
            const baseName = path.basename(file.fileName);
            return baseName !== "lib.d.ts" && baseName !== "lib.es6.d.ts";
        }).map(sourceFile => {
            return new TsSourceFile({
                tsCache: this.tsCache,
                node: sourceFile,
                symbol: typeChecker.getSymbolAtLocation(sourceFile),
                typeChecker: typeChecker,
                sourceFile: sourceFile
            });
        });
    }

    getSourceFiles() {
        return this.sourceFiles;
    }

    private getTsCompilerOptions(compilerOptions: CompilerOptions) {
        function getValue<T>(currentValue: T, newValue: T) {
            return (currentValue == null) ? newValue : currentValue;
        }

        let combinedOptions = (compilerOptions || {}) as any as ts.CompilerOptions;

        combinedOptions.allowNonTsExtensions = getValue(combinedOptions.allowNonTsExtensions, true);
        combinedOptions.noLib = getValue(combinedOptions.noLib, false);
        combinedOptions.experimentalDecorators = getValue(combinedOptions.experimentalDecorators, true);
        combinedOptions.experimentalDecorators = getValue(combinedOptions.experimentalDecorators, true);
        combinedOptions.suppressExcessPropertyErrors = getValue(combinedOptions.suppressExcessPropertyErrors, true);
        combinedOptions.suppressImplicitAnyIndexErrors = getValue(combinedOptions.suppressImplicitAnyIndexErrors, true);
        combinedOptions.noImplicitAny = getValue(combinedOptions.noImplicitAny, false);

        return combinedOptions;
    }
}
