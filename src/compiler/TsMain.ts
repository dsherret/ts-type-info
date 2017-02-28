import * as ts from "typescript";
import * as path from "path";
import {Options} from "./../options";
import {FileNotFoundError} from "./../errors";
import {FileUtils} from "./../utils";
import {CompilerOptionsResolver} from "./utils/CompilerOptionsResolver";
import {TsTypeChecker} from "./utils/TsTypeChecker";
import {TsCache} from "./utils/TsCache";
import {TsSourceFile} from "./TsSourceFile";

export class TsMain {
    private readonly tsCache = new TsCache();
    private readonly program: ts.Program;
    private readonly typeChecker: ts.TypeChecker;
    private readonly compilerHost: ts.CompilerHost;

    constructor(compilerOptionsResolver: CompilerOptionsResolver, filePaths: string[], options: Options) {
        const compilerOptions = compilerOptionsResolver.getCompilerOptions(options);
        this.compilerHost = options.compilerHost || ts.createCompilerHost(compilerOptions);

        // verify if the file names exist after creating the compiler host
        this.verifyFilesExist(filePaths);

        this.program = ts.createProgram(filePaths, compilerOptions, options.compilerHost);
        this.typeChecker = this.program.getTypeChecker();
    }

    getSourceFiles() {
        const tsTypeChecker = new TsTypeChecker(this.typeChecker);

        return this.program.getSourceFiles().filter(file => {
            const baseName = path.basename(file.fileName);
            return baseName !== "lib.d.ts" && baseName !== "lib.es6.d.ts";
        }).map(sourceFile => {
            return new TsSourceFile({
                tsCache: this.tsCache,
                sourceFile,
                symbol: tsTypeChecker.getSymbolAtLocation(sourceFile),
                typeChecker: tsTypeChecker
            });
        });
    }

    getTypeScriptTypeChecker() {
        return this.typeChecker;
    }

    private verifyFilesExist(filePaths: string[]) {
        filePaths.forEach(filePath => this.verifyFileExists(filePath));
    }

    private verifyFileExists(filePath: string) {
        if (!this.compilerHost.fileExists(filePath))
            throw new FileNotFoundError(FileUtils.getAbsolutePath(filePath));
    }
}
