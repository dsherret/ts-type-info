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
}
