import * as ts from "typescript";
import {TsType} from "./TsType";
import {TsBase, TsBaseOptions} from "./TsBase";

export interface TsTypeExpressionOptions extends TsBaseOptions {
    type: ts.Type;
}

export class TsTypeExpression extends TsBase {
    private types: TsType[] = [];
    protected tsType: ts.Type;

    constructor(opts: TsTypeExpressionOptions) {
        super(opts);

        this.tsType = opts.type;
    }

    getText() {
        return this.typeChecker.typeToString(this.sourceFile, this.tsType);
    }

    addType(type: TsType) {
        this.types.push(type);
    }

    getTypes() {
        return this.types;
    }

    getUnionOrIntersectionTypeExpressions() {
        return ((this.tsType as ts.UnionOrIntersectionType).types || []).map(t => this.createTypeExpression(t));
    }

    getArrayElementTypeExpression() {
        return this.createTypeExpression(this.getArrayElementType());
    }

    isArrayType() {
        return this.getArrayElementType() != null;
    }

    isIntersectionType() {
        return (this.tsType.flags & ts.TypeFlags.Intersection) !== 0;
    }

    isUnionType() {
        return (this.tsType.flags & ts.TypeFlags.Union) !== 0;
    }

    private getArrayElementType() {
        return (this.tsType as any).elementType as ts.Type || this.getArrayTypeArgument();
    }

    private getArrayTypeArgument() {
        const typeRef = (this.tsType as ts.TypeReference);

        if (typeRef.typeArguments != null && typeRef.typeArguments.length === 1 &&
            this.tsType.symbol != null && (this.tsType.symbol || {} as ts.Symbol).name === "Array"
        ) {
            return typeRef.typeArguments[0];
        }
        else {
            return null;
        }
    }

    private createTypeExpression(tsType: ts.Type): TsTypeExpression {
        return new TsTypeExpression({
            sourceFile: this.sourceFile,
            typeChecker: this.typeChecker,
            type: tsType,
            tsCache: this.tsCache
        });
    }
}
