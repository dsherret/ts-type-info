import * as ts from "typescript";
import {tryGet} from "./../../utils";
import {IType} from "./../type";
import {ITypeExpression} from "./../type-expression";
import {ISymbol} from "./../symbol";
import {ISignature} from "./../signature";
import {TsSourceFileChild, TsSourceFileChildOptions} from "./ts-source-file-child";
import {TsSymbol} from "./ts-symbol";
import {TsSignature} from "./ts-signature";
import {TsTypeExpression} from "./ts-type-expression";

export interface TsTypeOptions extends TsSourceFileChildOptions {
    type: ts.Type;
}

export class TsType extends TsSourceFileChild implements IType {
    private type: ts.Type;

    constructor(opts: TsTypeOptions) {
        super(opts);

        this.type = opts.type;
    }

    getText() {
        return this.typeChecker.typeToString(this.sourceFile, this.type);
    }

    getBaseTypeExpressions(): ITypeExpression[] {
        return (this.type.getBaseTypes() || []).map(baseType => this.createTypeExpression(baseType));
    }

    getProperties(): ISymbol[] {
        const properties = this.type.getProperties();

        return (properties || []).filter(p => p.name !== "prototype").map(property => {
            return this.createSymbol(property);
        });
    }

    getCallSignatures() {
        const callSignatures = this.type.getCallSignatures();

        return (callSignatures || []).map(callSignature => {
            return this.createTsSignature({
                signature: callSignature
            });
        });
    }

    getTypeArguments() {
        const tsTypeArguments = (this.type as ts.TypeReference).typeArguments;

        return (tsTypeArguments || []).map(arg => {
            return tryGet(this.getText(), () => this.createType(arg));
        });
    }

    getSymbols(): ISymbol[] {
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

    private createTypeExpression(type: ts.Type): ITypeExpression {
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

    private createType(type: ts.Type): IType {
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

    private createTsSignature(opts: { signature: ts.Signature }): ISignature {
        return new TsSignature({
            sourceFile: this.sourceFile,
            typeChecker: this.typeChecker,
            tsCache: this.tsCache,
            signature: opts.signature,
            tsSourceFile: this.tsSourceFile
        });
    }
}
