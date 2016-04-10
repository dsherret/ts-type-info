import {ExpressionTestStructure} from "./../expressions";

export interface ReExportPartTestStructure {
    exportName: string;
    expression?: ExpressionTestStructure;
    definitions?: { name: string, type: any }[];
}
