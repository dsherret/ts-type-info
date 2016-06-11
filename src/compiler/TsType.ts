import * as ts from "typescript";
import {tryGet} from "./../utils";
import {TsSourceFileChild, TsSourceFileChildOptions} from "./TsSourceFileChild";
import {TsSymbol} from "./TsSymbol";
import {TsSignature} from "./TsSignature";

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

    isArrayType() {
        return this.getArrayElementType() != null;
    }

    isTupleType() {
        return (this.type.flags & ts.TypeFlags.Tuple) !== 0;
    }

    isIntersectionType() {
        return (this.type.flags & ts.TypeFlags.Intersection) !== 0;
    }

    isUnionType() {
        return (this.type.flags & ts.TypeFlags.Union) !== 0;
    }

    isAnonymousType() {
        return (this.type.flags & ts.TypeFlags.Anonymous) !== 0;
    }

    isReferenceType() {
        return (this.type.flags & ts.TypeFlags.Reference) !== 0;
    }

    isClassType() {
        return (this.type.flags & ts.TypeFlags.Class) !== 0;
    }

    isInterfaceType() {
        return (this.type.flags & ts.TypeFlags.Interface) !== 0;
    }

    getUnionOrIntersectionTypes() {
        return ((this.type as ts.UnionOrIntersectionType).types || []).map(t => this.createType(t));
    }

    getArrayElementType() {
        const type = (this.type as any).elementType as ts.Type || this.getArrayTypeArgument();
        return type == null ? null : this.createType(type);
    }

    private getArrayTypeArgument() {
        const typeRef = (this.type as ts.TypeReference);

        if (typeRef.typeArguments != null && typeRef.typeArguments.length === 1 &&
            this.type.symbol != null && (this.type.symbol || {} as ts.Symbol).name === "Array"
        ) {
            return typeRef.typeArguments[0];
        }
        else {
            return null;
        }
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
