import * as ts from "typescript";
import {ITypeExpression} from "./../ITypeExpression";
import {IType} from "./../IType";
import {TsBase, TsBaseOptions} from "./TsBase";

export interface TsTypeExpressionOptions extends TsBaseOptions {
    type: ts.Type;
}

export class TsTypeExpression extends TsBase implements ITypeExpression {
    private types: IType[] = [];
    protected tsType: ts.Type;

    constructor(opts: TsTypeExpressionOptions) {
        super(opts);

        this.tsType = opts.type;
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
