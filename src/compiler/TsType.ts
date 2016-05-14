import * as ts from "typescript";
import {tryGet} from "./../utils";
import {TsSourceFileChild, TsSourceFileChildOptions} from "./TsSourceFileChild";
import {TsSymbol} from "./TsSymbol";
import {TsSignature} from "./TsSignature";
import {TsTypeExpression} from "./TsTypeExpression";

export interface TsTypeOptions extends TsSourceFileChildOptions {
    type: ts.Type;
}

export class TsType extends TsSourceFileChild {
    private type: ts.Type;

    constructor(opts: TsTypeOptions) {
        super(opts);

        this.type = opts.type;
    }

    getText() {
        return this.typeChecker.typeToString(this.sourceFile, this.type);
    }

    getBaseTypeExpressions(): TsTypeExpression[] {
        // not sure why, but accessing target.resolvedBaseTypes is necessary for getting the info
        // for BaseParameterDefinition in this library...
        const typeReference = this.type as ts.TypeReference;
        const baseTypes = (typeReference.target || {} as any).resolvedBaseTypes as ts.ObjectType[] || this.type.getBaseTypes();

        return (baseTypes || []).map(t => this.createTypeExpression(t));
    }

    getProperties(): TsSymbol[] {
        const properties = this.type.getProperties();
        return (properties || []).filter(p => p.name !== "prototype").map(property => this.createSymbol(property));
    }

    getCallSignatures() {
        const callSignatures = this.type.getCallSignatures();
        return (callSignatures || []).map(callSignature => this.createTsSignature({ signature: callSignature }));
    }

    getTypeArguments() {
        const tsTypeArguments = (this.type as ts.TypeReference).typeArguments;
        return (tsTypeArguments || []).map(arg => tryGet(this.getText(), () => this.createType(arg)));
    }

    getSymbols(): TsSymbol[] {
        const typeArray = (this.type as ts.UnionOrIntersectionType).types;

        if (typeArray != null) {
            return typeArray.map(t => t.symbol).filter(s => s != null).map(s => this.createSymbol(s));
        }
        else if (this.type.symbol != null) {
            return [this.createSymbol(this.type.symbol)];
        }
        else {
            return [];
        }
    }

    isTupleType() {
        return (this.type.flags & ts.TypeFlags.Tuple) !== 0;
    }

    hasCallSignaturesAndProperties() {
        return (this.type.flags & (
            ts.TypeFlags.ObjectType |
            ts.TypeFlags.Instantiated
        )) !== 0 &&
        (this.type.flags & (
            ts.TypeFlags.Class |
            ts.TypeFlags.Interface
        )) === 0;
    }

    private createTypeExpression(type: ts.Type): TsTypeExpression {
        return this.tsCache.getTypeExpression(
            this.typeChecker,
            this.sourceFile,
            type,
            () => new TsTypeExpression({
                sourceFile: this.sourceFile,
                typeChecker: this.typeChecker,
                tsCache: this.tsCache,
                type: type
            }),
            (typeType) => new TsType({
                sourceFile: this.sourceFile,
                tsSourceFile: this.tsSourceFile,
                typeChecker: this.typeChecker,
                tsCache: this.tsCache,
                type: typeType
            }));
    }

    private createType(type: ts.Type): TsType {
        return this.tsCache.getType(this.typeChecker, this.sourceFile, type, () => new TsType({
            sourceFile: this.sourceFile,
            tsSourceFile: this.tsSourceFile,
            typeChecker: this.typeChecker,
            tsCache: this.tsCache,
            type: type
        }));
    }

    private createSymbol(symbol: ts.Symbol) {
        return this.tsCache.getSymbol(symbol, () => {
            return new TsSymbol({
                sourceFile: this.sourceFile,
                typeChecker: this.typeChecker,
                tsCache: this.tsCache,
                symbol: symbol,
                tsSourceFile: this.tsSourceFile
            });
        });
    }

    private createTsSignature(opts: { signature: ts.Signature }): TsSignature {
        return new TsSignature({
            sourceFile: this.sourceFile,
            typeChecker: this.typeChecker,
            tsCache: this.tsCache,
            signature: opts.signature,
            tsSourceFile: this.tsSourceFile
        });
    }
}
