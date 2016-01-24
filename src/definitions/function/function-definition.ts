import * as ts from "typescript";
import {BaseFunctionDefinition} from "./base";
import {ParameterDefinition} from "./parameter-definition";
import {IExportableDefinition, ExportableDefinition, IAmbientableDefinition, AmbientableDefinition} from "./../base";
import {TypeChecker, applyMixins} from "./../../utils";

export class FunctionDefinition extends BaseFunctionDefinition<ParameterDefinition> implements IExportableDefinition, IAmbientableDefinition {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        super(ParameterDefinition, typeChecker, symbol);
        this.fillIsExported(typeChecker, symbol);
        this.fillIsAmbient(typeChecker, symbol);
    }

    // ExportableDefinition
    fillIsExported: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    isExported: boolean;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    fillIsAmbient: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
}

applyMixins(FunctionDefinition, [ExportableDefinition, AmbientableDefinition]);
