import {BaseTestStructure} from "./../base";
import {ExpressionTestStructure} from "./../expression";

export interface StarImportPartTestStructure extends BaseTestStructure {
    name: string;
    expression?: ExpressionTestStructure;
    definitions?: { name: string, type: any }[];
}
