import * as ts from "typescript";
import {FileDefinition} from "./definitions";
import * as path from "path";
import * as tmp from "tmp";
import * as fs from "fs";
import {TypeChecker, TypeExpressionCache, DefinitionCache, StringUtils} from "./utils";

export * from "./definitions";
export * from "./expressions";
export * from "./scope";

export function getFileInfo(fileNames: string[]): FileDefinition[] {
    verifyArray(fileNames);

    const options: ts.CompilerOptions = { noLib: false, experimentalDecorators: true };
    const host = ts.createCompilerHost(options);
    const program = ts.createProgram(fileNames, options, host);
    const tsTypeChecker = program.getTypeChecker();
    const typeChecker = new TypeChecker(tsTypeChecker);
    const typeExpressionCache = new TypeExpressionCache(typeChecker);
    const definitionCache = new DefinitionCache(typeChecker);

    typeChecker.setTypeCache(typeExpressionCache);

    const sourceFiles = program.getSourceFiles()
        .filter(file => path.basename(file.fileName) !== "lib.d.ts")
        .map(file => {
            typeChecker.setCurrentNode(file);

            return definitionCache.getFileDefinition(file);
        });

    typeExpressionCache.fillAllCachedTypesWithDefinitions(definitionCache);

    return sourceFiles;
}

export function getStringInfo(code: string): FileDefinition {
    verifyString(code);

    const tmpFile = tmp.fileSync({ postfix: ".ts" });
    let fileDefinition: FileDefinition;

    try {
        code = StringUtils.ensureEndsWithNewline(code);
        fs.writeFileSync(tmpFile.name, code);
        fileDefinition = getFileInfo([tmpFile.name])[0];
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
