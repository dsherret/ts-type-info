import * as ts from "typescript";
import {BaseClassPropertyDefinition} from "./base/base-class-property-definition";
import {TypeChecker} from "./../utils";

export class ClassPropertyDefinition extends BaseClassPropertyDefinition {
    private _isAccessor: boolean;
    private _isReadonly: boolean;

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        super(typeChecker, symbol);

        this.fillAccessorInformation(symbol);
    }

    get isAccessor() {
        return this._isAccessor;
    }

    get isReadonly() {
        return this._isReadonly;
    }

    private fillAccessorInformation(symbol: ts.Symbol) {
        const flags = symbol.getFlags();
        this._isAccessor = (flags & ts.SymbolFlags.GetAccessor) !== 0;
        this._isReadonly = this._isAccessor && (flags & ts.SymbolFlags.SetAccessor) === 0;
    }

    static isProperty(symbol: ts.Symbol) {
        const flags = symbol.getFlags();
        return (flags & ts.SymbolFlags.Property) !== 0 ||
            (flags & ts.SymbolFlags.GetAccessor) !== 0;
    }
}
