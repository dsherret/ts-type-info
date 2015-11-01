import * as ts from "typescript";
import {FileDefinition} from "./definitions";
import * as path from "path";
import * as tmp from "tmp";
import * as fs from "fs";
import {TypeChecker, ClassDefinitionCache} from "./utils";

export function getFileInfo(...fileNames: string[]): FileDefinition[] {
    const options: ts.CompilerOptions = { noLib: false, experimentalDecorators: true };
    const host = ts.createCompilerHost(options);
    const program = ts.createProgram(fileNames, options, host);
    const tsTypeChecker = program.getTypeChecker();

    return program.getSourceFiles()
        .filter(file => path.basename(file.fileName) !== "lib.d.ts")
        .map(file => {
            const typeChecker = new TypeChecker(tsTypeChecker, file);
            const definitionCache = new ClassDefinitionCache(typeChecker);

            return new FileDefinition(typeChecker, definitionCache, file);
        });
}

export function getStringInfo(code: string): FileDefinition {
    const tmpFile = tmp.fileSync({ postfix: ".ts" });
    let fileDefinition: FileDefinition;

    try
    {
        code = addNewLineToCodeIfNecessary(code);
        fs.writeFileSync(tmpFile.name, code + "\n");
        fileDefinition = getFileInfo(tmpFile.name)[0];
    }
    finally {
        tmpFile.removeCallback();
    }

    return fileDefinition;
}

function addNewLineToCodeIfNecessary(code: string) {
    if (typeof code === "string" && code.length > 0 && code[code.length - 1] != "\n") {
        code += "\n";
    }

    return code;
}