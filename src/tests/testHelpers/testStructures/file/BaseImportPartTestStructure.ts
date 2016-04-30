import {BaseTestStructure} from "./../base";
import {ExpressionTestStructure} from "./../expression";

export interface BaseImportPartTestStructure extends BaseTestStructure {
    expression?: ExpressionTestStructure;
    definitions?: { name: string, type: any }[];
}
