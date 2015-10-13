import * as ts from "typescript";
import {FileDefinition} from "./definitions";
import * as path from "path";
import {TypeChecker} from "./utils";

export function getFileInfo(...fileNames: string[]): FileDefinition[] {
    const options: ts.CompilerOptions = { noLib: false, experimentalDecorators: true };
    const host = ts.createCompilerHost(options);
    const program = ts.createProgram(fileNames, options, host);
    const typeChecker = program.getTypeChecker();

    return program.getSourceFiles()
        .filter(file => path.basename(file.fileName) !== "lib.d.ts")
        .map(file => new FileDefinition(new TypeChecker(typeChecker, file), file));
}
