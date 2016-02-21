import * as ts from "typescript";
import {ITypeExpression} from "./../type-expression";
import {IType} from "./../type";
import {TsBase, TsBaseOptions} from "./ts-base";

export interface TsTypeExpressionOptions extends TsBaseOptions {
    tsType: ts.Type;
}

export class TsTypeExpression extends TsBase implements ITypeExpression {
    private types: IType[] = [];
    protected tsType: ts.Type;

    constructor(opts: TsTypeExpressionOptions) {
        super(opts);

        this.tsType = opts.tsType;
    }

    getText() {
        return this.typeChecker.typeToString(this.sourceFile, this.tsType);
    }

    addType(type: IType) {
        this.types.push(type);
    }

    getTypes() {
        return this.types;
    }
}
