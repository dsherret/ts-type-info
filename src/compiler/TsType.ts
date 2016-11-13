import * as ts from "typescript";
import {tryGet, Memoize, Logger} from "./../utils";
import {TsSourceFileChild, TsSourceFileChildOptions} from "./TsSourceFileChild";
import {TsSymbol} from "./TsSymbol";
import {TsSignature} from "./TsSignature";
import {TypeToStringWriter} from "./TypeToStringWriter";

export interface TsTypeOptions extends TsSourceFileChildOptions {
    type: ts.Type;
    node: ts.Node | null;
}

export class TsType extends TsSourceFileChild {
    private readonly type: ts.Type;
    private readonly node: ts.Node | null;
    private readonly typeToStringWriter = new TypeToStringWriter();

    constructor(opts: TsTypeOptions) {
        super(opts);
        this.type = opts.type;
        this.node = opts.node;
    }

    @Memoize
    getText() {
        let text = "";

        try {
            text = this.typeToStringWriter.getString(this);
        } catch (ex) {
            Logger.log(ex);
        }

        return text || this.getTypeCheckerTypeText();
    }

    @Memoize
    getTypeCheckerTypeText() {
        let formatFlags = (ts.TypeFormatFlags.UseTypeOfFunction | ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.UseFullyQualifiedType |
            ts.TypeFormatFlags.WriteTypeArgumentsOfSignature) as ts.TypeFormatFlags;

        if (this.isMainTypeAliasType()) {
            formatFlags |= ts.TypeFormatFlags.InTypeAlias;
        }

        return this.typeChecker.typeToString(this.type, this.node, formatFlags) || "";
    }

    getLiteralText() {
        return (this.type as ts.LiteralType).text || "";
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
        const tsTypeArguments = (this.type as ts.TypeReference).typeArguments || [];
        return tsTypeArguments.map(arg => tryGet(this.getTypeCheckerTypeText(), () => this.createType(arg))!).filter(arg => arg != null);
    }

    getAliasTypeArguments() {
        const tsTypeArguments = this.type.aliasTypeArguments || [];
        return tsTypeArguments.map(arg => tryGet(this.getTypeCheckerTypeText(), () => this.createType(arg))!).filter(arg => arg != null);
    }

    getAliasSymbol() {
        return this.type.aliasSymbol == null ? null : this.createSymbol(this.type.aliasSymbol);
    }

    getSymbol() {
        return this.type.symbol == null ? null : this.createSymbol(this.type.symbol);
    }

    getSymbols(): TsSymbol[] {
        const typeArray = (this.type as ts.UnionOrIntersectionType).types;

        if (this.type.aliasSymbol != null) {
            return [this.createSymbol(this.type.aliasSymbol)];
        }
        else if (!this.isEnumType() && typeArray != null) {
            return typeArray.map(t => t.symbol).filter(s => s != null).map(s => this.createSymbol(s!));
        }
        else if (this.type.symbol != null) {
            return [this.createSymbol(this.type.symbol)];
        }
        else {
            return [];
        }
    }

    getUnionOrIntersectionTypes() {
        return ((this.type as ts.UnionOrIntersectionType).types || []).map(t => this.createType(t));
    }

    getArrayElementType() {
        const type = (this.type as any).elementType as ts.Type || this.getArrayTypeArgument();
        return type == null ? null : this.createType(type);
    }

    isArrayType() {
        return this.getArrayElementType() != null;
    }

    isBooleanType() {
        return (this.type.flags & ts.TypeFlags.Boolean) !== 0;
    }

    isEnumType() {
        return (this.type.flags & ts.TypeFlags.Enum) !== 0;
    }

    isThisType() {
        return (this.type.flags & ts.TypeFlags.ThisType) !== 0;
    }

    isTupleType() {
        return (this.type.flags & ts.TypeFlags.Tuple) !== 0;
    }

    isIntersectionType() {
        return (this.type.flags & ts.TypeFlags.Intersection) !== 0 && !this.isEnumType() && !this.isBooleanType();
    }

    isUnionType() {
        return (this.type.flags & ts.TypeFlags.Union) !== 0 && !this.isEnumType() && !this.isBooleanType();
    }

    isAnonymousFunctionType() {
        const symbol = this.getSymbol();

        if (!this.isAnonymousType() || symbol == null)
            return false;

        const node = symbol.getNodes()[0]

        if (node == null)
            return false;

        return node.isFunctionType();
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

    isMainTypeAliasType() {
        return this.node != null && this.node.kind === ts.SyntaxKind.TypeAliasDeclaration && this.typeChecker.getTypeAtLocation(this.node) === this.type;
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
        return new TsType({
            sourceFile: this.sourceFile,
            tsSourceFile: this.tsSourceFile,
            typeChecker: this.typeChecker,
            tsCache: this.tsCache,
            type,
            node: this.node
        });
    }

    private createSymbol(symbol: ts.Symbol) {
        return this.tsCache.getSymbol(symbol, () => {
            return new TsSymbol({
                sourceFile: this.sourceFile,
                typeChecker: this.typeChecker,
                tsCache: this.tsCache,
                symbol,
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
            node: this.node,
            tsSourceFile: this.tsSourceFile
        });
    }
}
