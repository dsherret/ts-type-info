import * as ts from "typescript";
import * as path from "path";
import {Options, CompilerOptions} from "./../options";
import {FileNotFoundError} from "./../errors";
import {FileUtils} from "./../utils";
import {TsTypeChecker} from "./utils/TsTypeChecker";
import {TsCache} from "./utils/TsCache";
import {TsSourceFile} from "./TsSourceFile";

export class TsMain {
    private readonly tsSourceFiles: TsSourceFile[];
    private readonly tsCache = new TsCache();

    constructor(fileNames: string[], options: Options) {
        this.verifyFilesExist(fileNames);

        const compilerOptions = this.getTsCompilerOptions(options.compilerOptions);
        const program = ts.createProgram(fileNames, compilerOptions);
        const typeChecker = new TsTypeChecker(program.getTypeChecker());

        this.tsSourceFiles = program.getSourceFiles().filter(file => {
            const baseName = path.basename(file.fileName);
            return baseName !== "lib.d.ts" && baseName !== "lib.es6.d.ts";
        }).map(sourceFile => {
            return new TsSourceFile({
                tsCache: this.tsCache,
                sourceFile: sourceFile,
                symbol: typeChecker.getSymbolAtLocation(sourceFile),
                typeChecker: typeChecker
            });
        });
    }

    getSourceFiles() {
        return this.tsSourceFiles;
    }

    private getTsCompilerOptions(compilerOptions: CompilerOptions | undefined) {
        function getValue<T>(currentValue: T, newValue: T) {
            return (currentValue == null) ? newValue : currentValue;
        }

        let combinedOptions = (compilerOptions || {}) as any as ts.CompilerOptions;

        combinedOptions.allowJs = getValue(combinedOptions.allowJs, true);
        combinedOptions.noLib = getValue(combinedOptions.noLib, false);
        combinedOptions.experimentalDecorators = getValue(combinedOptions.experimentalDecorators, true);
        combinedOptions.suppressExcessPropertyErrors = getValue(combinedOptions.suppressExcessPropertyErrors, true);
        combinedOptions.suppressImplicitAnyIndexErrors = getValue(combinedOptions.suppressImplicitAnyIndexErrors, true);
        combinedOptions.noImplicitAny = getValue(combinedOptions.noImplicitAny, false);
        combinedOptions.target = getValue(combinedOptions.target, ts.ScriptTarget.ES2015);
        combinedOptions.moduleResolution = getValue(combinedOptions.moduleResolution, ts.ModuleResolutionKind.NodeJs);
        combinedOptions.strictNullChecks = getValue(combinedOptions.strictNullChecks, false);

        return combinedOptions;
    }

    private verifyFilesExist(fileNames: string[]) {
        fileNames.forEach(fileName => {
            // unfortunately the ts compiler doesn't do things asynchronously so for now we won't either
            if (!FileUtils.fileExistsSync(fileName)) {
                throw new FileNotFoundError(FileUtils.getAbsolutePath(fileName));
            }
        });
    }
}
