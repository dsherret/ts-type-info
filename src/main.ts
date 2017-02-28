import * as fs from "fs";
import * as ts from "typescript";
import {CompilerOptionsResolver} from "./compiler/utils/CompilerOptionsResolver";
import {TsMain} from "./compiler/TsMain";
import {ArgumentTypeError} from "./errors";
import {FileDefinition, GlobalDefinition} from "./definitions";
import {MainFactory} from "./factories";
import {Options} from "./options";
import {StringUtils, Logger} from "./utils";

export * from "./options";
export * from "./WriteOptions";
export * from "./definitions";
export * from "./errors";
export * from "./structures";
export * from "./createFunctions";

export function getInfoFromFiles(fileNames: string[], options?: Options): GlobalDefinition {
    if (!(fileNames instanceof Array))
        throw new ArgumentTypeError("fileNames", "array");

    options = options || {};
    const {includeTsNodes = false, showDebugMessages = false, getTypesFromTypeNodes = false} = options;

    Logger.setEnabled(showDebugMessages);

    const tsMain = new TsMain(new CompilerOptionsResolver(), fileNames, options);
    const tsFactory = new MainFactory().createTsFactory({ includeTsNodes, getTypesFromTypeNodes });

    const fileDefinitions = tsMain.getSourceFiles().map(sourceFile => tsFactory.getFileDefinition(sourceFile));

    tsFactory.bindDeferred();
    tsFactory.fillAllCachedTypesWithDefinitions();

    const globalDef = new GlobalDefinition();
    globalDef.files = fileDefinitions;
    if (includeTsNodes)
        globalDef.typeChecker = tsMain.getTypeScriptTypeChecker();
    return globalDef;
}

export function getInfoFromString(code: string, options?: Options): FileDefinition {
    if (typeof code !== "string")
        throw new ArgumentTypeError("code", "string");
    if (options != null && options.compilerHost != null)
        throw new Error(`You cannot supply a custom compiler host when running ${nameof(getInfoFromString)}.`);

    code = StringUtils.ensureEndsWithNewline(code);

    const tempFileName = "tsTypeInfoStringFile.ts";
    const compilerOptions = getCompilerOptions(options);
    const defaultLibFilePath = ts.getDefaultLibFilePath(compilerOptions);
    const defaultLibFileName = ts.getDefaultLibFileName(compilerOptions);

    const tempFileSourceFile = ts.createSourceFile(tempFileName, code, compilerOptions.target!);
    // todo: get lib source file from the document registry (this works for now)
    const libSourceFile = ts.createSourceFile(defaultLibFileName, fs.readFileSync(defaultLibFilePath, "utf-8"), compilerOptions.target!);

    options = options || {};
    options.compilerHost = {
        getSourceFile: fileName => {
            if (fileName === tempFileName)
                return tempFileSourceFile;
            if (fileName === defaultLibFileName)
                return libSourceFile;

            throw new Error(`Could not find source file for: ${fileName}. This is a bug.` +
                `Please report your reproduction steps to ts-type-info's issue tracker.`);
        },
        getDefaultLibFileName: () => defaultLibFileName,
        getCurrentDirectory: () => "",
        getDirectories: () => [],
        getCanonicalFileName: fileName => fileName,
        useCaseSensitiveFileNames: () => true,
        getNewLine: () => "\n",
        fileExists: filePath => filePath === tempFileName || filePath === defaultLibFileName,
        readFile: fileName => fileName === tempFileName ? code : "",
        writeFile: (fileName, text) => {}
    };
    return getInfoFromFiles([tempFileName], options).files[0];
}

function getCompilerOptions(options: Options | undefined) {
    const compilerOptions = (options || {}).compilerOptions || {};
    if (compilerOptions.target == null)
        compilerOptions.target = ts.ScriptTarget.ES2015;
    return compilerOptions;
}
