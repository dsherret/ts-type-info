import * as ts from "typescript";
import {FileDefinition} from "./definitions";
import * as path from "path";
import * as tmp from "tmp";
import * as fs from "fs";
import {TypeChecker, TypeExpressionCache, DefinitionCache, StringUtils} from "./utils";
import {Options, CompilerOptions} from "./options";

export * from "./options";
export * from "./definitions";
export * from "./expressions";
export * from "./scope";

export function getFileInfo(fileNames: string[], options?: Options): FileDefinition[] {
    verifyArray(fileNames);
    options = options || {};

    const compilerOptions = getTsCompilerOptions(options.compilerOptions);
    const host = ts.createCompilerHost(compilerOptions);
    const program = ts.createProgram(fileNames, compilerOptions, host);
    const tsTypeChecker = program.getTypeChecker();
    const typeChecker = new TypeChecker(tsTypeChecker);
    const typeExpressionCache = new TypeExpressionCache(typeChecker);
    const definitionCache = new DefinitionCache(typeChecker);

    typeChecker.setTypeCache(typeExpressionCache);

    const sourceFiles = program.getSourceFiles()
        .filter(file => {
            const baseName = path.basename(file.fileName);

            return baseName !== "lib.d.ts" && baseName !== "lib.es6.d.ts";
        })
        .map(file => {
            typeChecker.setCurrentSourceFile(file);

            return definitionCache.getFileDefinition(file);
        });

    typeExpressionCache.fillAllCachedTypesWithDefinitions(definitionCache);

    return sourceFiles;
}

export function getStringInfo(code: string, options?: Options): FileDefinition {
    verifyString(code);

    const tmpFile = tmp.fileSync({ postfix: ".ts" });
    let fileDefinition: FileDefinition;

    try {
        code = StringUtils.ensureEndsWithNewline(code);
        fs.writeFileSync(tmpFile.name, code);
        fileDefinition = getFileInfo([tmpFile.name], options)[0];
    }
    finally {
        tmpFile.removeCallback();
    }

    return fileDefinition;
}

function verifyArray(fileNames: string[]) {
    if (!(fileNames instanceof Array)) {
        throw new Error("Please provide an array of file names to getFileInfo.");
    }
}

function verifyString(code: string) {
    if (typeof code !== "string") {
        throw new Error("Please provide a string to getStringInfo");
    }
}

function getTsCompilerOptions(compilerOptions: CompilerOptions) {
    function getValue<T>(currentValue: T, newValue: T) {
        return (currentValue == null) ? newValue : currentValue;
    }

    let combinedOptions = (compilerOptions || {}) as any as ts.CompilerOptions;

    combinedOptions.allowNonTsExtensions = getValue(combinedOptions.allowNonTsExtensions, true);
    combinedOptions.noLib = getValue(combinedOptions.noLib, false);
    combinedOptions.experimentalDecorators = getValue(combinedOptions.experimentalDecorators, true);
    combinedOptions.experimentalDecorators = getValue(combinedOptions.experimentalDecorators, true);
    combinedOptions.experimentalAsyncFunctions = getValue(combinedOptions.experimentalAsyncFunctions, true);
    combinedOptions.suppressExcessPropertyErrors = getValue(combinedOptions.suppressExcessPropertyErrors, true);
    combinedOptions.suppressImplicitAnyIndexErrors = getValue(combinedOptions.suppressImplicitAnyIndexErrors, true);
    combinedOptions.noImplicitAny = getValue(combinedOptions.noImplicitAny, false);

    return combinedOptions;
}
