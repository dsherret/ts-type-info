import * as ts from "typescript";
import {BaseClassPropertyDefinition} from "./base";
import {TypeChecker} from "./../../utils";

export class ClassPropertyDefinition extends BaseClassPropertyDefinition<ClassPropertyDefinition> {
    isAccessor: boolean;
    isReadonly: boolean;

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        super(typeChecker, symbol);

        this.fillAccessorInformation(symbol);
    }

    private fillAccessorInformation(symbol: ts.Symbol) {
        const flags = symbol.getFlags();
        this.isAccessor = (flags & ts.SymbolFlags.GetAccessor) !== 0;
        this.isReadonly = this.isAccessor && (flags & ts.SymbolFlags.SetAccessor) === 0;
    }
}
