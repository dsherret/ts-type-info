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

    constructor(compilerOptionsResolver: CompilerOptionsResolver, fileNames: string[], options: Options) {
        this.verifyFilesExist(fileNames);

        const compilerOptions = compilerOptionsResolver.getCompilerOptions(options);
        this.program = ts.createProgram(fileNames, compilerOptions, options.compilerHost);
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
        // unfortunately the ts compiler doesn't do things asynchronously so for now we won't either
        if (!FileUtils.fileExistsSync(filePath)) {
            throw new FileNotFoundError(FileUtils.getAbsolutePath(filePath));
        }
    }
}
