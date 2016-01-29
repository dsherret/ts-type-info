import * as ts from "typescript";
import CodeBlockWriter from "code-block-writer";
import {BaseFunctionDefinition} from "./base";
import {ParameterDefinition} from "./parameter-definition";
import {IExportableDefinition, ExportableDefinition, IAmbientableDefinition, AmbientableDefinition} from "./../base";
import {TypeChecker, applyMixins} from "./../../utils";
import {FunctionWriter} from "./../../writers";
import {WriteFlags} from "./../../write-flags";

export class FunctionDefinition extends BaseFunctionDefinition<ParameterDefinition> implements IExportableDefinition, IAmbientableDefinition {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        super(ParameterDefinition, typeChecker, symbol);
        this.fillExportable(typeChecker, symbol);
        this.fillAmbientable(typeChecker, symbol);
    }

    write() {
        const writer = new CodeBlockWriter();
        const functionWriter = new FunctionWriter(writer);
        functionWriter.write(this, WriteFlags.None);
        return writer.toString();
    }

    // ExportableDefinition
    fillExportable: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    isExported: boolean;
    hasExportKeyword: boolean;
    // AmbientableDefinition
    fillAmbientable: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
}

applyMixins(FunctionDefinition, [ExportableDefinition, AmbientableDefinition]);
