import * as ts from "typescript";
import CodeBlockWriter from "code-block-writer";
import {ModuledDefinitions} from "./../../definitions";
import {TypeChecker, applyMixins} from "./../../utils";
import {IExportableDefinition, ExportableDefinition, IAmbientableDefinition, AmbientableDefinition, DefinitionType, BaseFunctionDefinition} from "./../base";
import {FunctionWriter} from "./../../writers";
import {WriteFlags} from "./../../write-flags";
import {FunctionParameterDefinition} from "./function-parameter-definition";

export class FunctionDefinition extends BaseFunctionDefinition<ModuledDefinitions, FunctionParameterDefinition> implements IExportableDefinition, IAmbientableDefinition {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        super(typeChecker, symbol, FunctionParameterDefinition, DefinitionType.Function);
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
