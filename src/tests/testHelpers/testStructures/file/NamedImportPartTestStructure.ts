import {BaseTestStructure} from "./../base";
import {ExpressionTestStructure} from "./../expression";

export interface NamedImportPartTestStructure {
    name: string;
    alias?: string;
    expression?: ExpressionTestStructure;
    definitions?: { name: string, type: any }[];
}
