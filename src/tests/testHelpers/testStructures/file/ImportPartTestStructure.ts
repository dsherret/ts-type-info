import {ExpressionTestStructure} from "./../expressions";

export interface ImportPartTestStructure {
    importName: string;
    expression: ExpressionTestStructure;
    definitions: { name: string, type: any }[];
}
