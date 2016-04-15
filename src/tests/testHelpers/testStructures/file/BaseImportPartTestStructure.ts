import {ExpressionTestStructure} from "./../expressions";

export interface BaseImportPartTestStructure {
    expression?: ExpressionTestStructure;
    definitions?: { name: string, type: any }[];
}
