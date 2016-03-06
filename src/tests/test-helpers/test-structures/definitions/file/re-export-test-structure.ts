import {ExpressionTestStructure} from "./../../expressions";

export interface ReExportTestStructure {
    moduleSpecifier: string;
    fileName: string;
    starExports: ({
        exportName: string;
        expression: ExpressionTestStructure;
        definitions: { name: string, type: any }[];
    })[];
    namedExports: ({
        exportName: string;
        expression: ExpressionTestStructure;
        definitions: { name: string, type: any }[];
    })[];
}
