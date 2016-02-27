import * as ts from "typescript";
import {IType} from "./../type";
import {ITypeExpression} from "./../type-expression";
import {ISymbol} from "./../symbol";
import {TsSourceFileChild, TsSourceFileChildOptions} from "./ts-source-file-child";
import {TsTypeExpression} from "./ts-type-expression";
import {TsType} from "./ts-type";
import {TsSymbol} from "./ts-symbol";

interface TsSignatureOptions extends TsSourceFileChildOptions {
    signature: ts.Signature;
}

export class TsSignature extends TsSourceFileChild {
    private signature: ts.Signature;

    constructor(opts: TsSignatureOptions) {
        super(opts);
        this.signature = opts.signature;
    }

    getReturnTypeExpression() {
        const tsType = this.typeChecker.getReturnTypeOfSignature(this.signature);

        return this.getTypeExpressionFromType(tsType);
    }

    getParameters() {
        const parameters = this.signature.parameters;
        return parameters.filter(p => p != null).map(parameter => this.createSymbol(parameter));
    }

    getTypeParameters() {
        type typeParameteredTypes = ts.ClassLikeDeclaration | ts.TypeAliasDeclaration | ts.InterfaceDeclaration | ts.FunctionDeclaration;
        let typeParameters = this.signature.typeParameters;

        return (typeParameters || []).map(typeParameter => {
            return this.createSymbol(typeParameter.symbol);
        });
    }

    getMinArgumentCount(): number {
        return (this.signature as any)["minArgumentCount"];
    }

    private getTypeExpressionFromType(tsType: ts.Type) {
        return this.tsCache.getTypeExpression(this.typeChecker, this.sourceFile, tsType, () => this.createTypeExpression(tsType), type => this.createType(type));
    }

    private createType(type: ts.Type): IType {
        return new TsType({
            sourceFile: this.sourceFile,
            typeChecker: this.typeChecker,
            type: type,
            tsCache: this.tsCache,
            tsSourceFile: this.tsSourceFile
        });
    }

    private createTypeExpression(tsType: ts.Type): ITypeExpression {
        return new TsTypeExpression({
            sourceFile: this.sourceFile,
            typeChecker: this.typeChecker,
            type: tsType,
            tsCache: this.tsCache
        });
    }

    private createSymbol(symbol: ts.Symbol): ISymbol {
        return new TsSymbol({
            sourceFile: this.sourceFile,
            tsSourceFile: this.tsSourceFile,
            typeChecker: this.typeChecker,
            tsCache: this.tsCache,
            symbol: symbol
        });
    }
}
