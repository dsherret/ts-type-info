import * as ts from "typescript";
import {BaseFunctionDefinition} from "./base";
import {ParameterDefinition} from "./parameter-definition";
import {IExportableDefinition, ExportableDefinition} from "./../base";
import {TypeChecker, applyMixins} from "./../../utils";

export class FunctionDefinition extends BaseFunctionDefinition<ParameterDefinition> implements IExportableDefinition {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        super(ParameterDefinition, typeChecker, symbol);
        this.fillIsExported(typeChecker, symbol);
    }

    // ExportableDefinition
    fillIsExported: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    isExported: boolean;
}

applyMixins(FunctionDefinition, [ExportableDefinition]);
