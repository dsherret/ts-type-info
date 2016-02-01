import * as ts from "typescript";
import CodeBlockWriter from "code-block-writer";
import {ModuledDefinitions} from "./../../definitions";
import {BaseFunctionDefinition} from "./base";
import {FunctionParameterDefinition} from "./function-parameter-definition";
import {IExportableDefinition, ExportableDefinition, IAmbientableDefinition, AmbientableDefinition} from "./../base";
import {TypeChecker, applyMixins} from "./../../utils";
import {FunctionWriter} from "./../../writers";
import {WriteFlags} from "./../../write-flags";

export class FunctionDefinition extends BaseFunctionDefinition<ModuledDefinitions, FunctionParameterDefinition> implements IExportableDefinition, IAmbientableDefinition {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        super(typeChecker, symbol, FunctionParameterDefinition);
        this.fillExportable(typeChecker, symbol);
        this.fillAmbientable(typeChecker, symbol);
    }

    write() {
        const writer = new CodeBlockWriter();
        const functionWriter = new FunctionWriter(writer);
        functionWriter.write(this, WriteFlags.Default);
        return writer.toString();
    }

    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    fillExportable: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    fillAmbientable: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
}

applyMixins(FunctionDefinition, [ExportableDefinition, AmbientableDefinition]);
