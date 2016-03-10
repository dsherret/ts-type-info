import {ExpressionTestStructure} from "./../../expressions";

export interface ImportTestStructure {
    moduleSpecifier: string;
    fileName: string;
    defaultImport: {
        importName: string;
        expression: ExpressionTestStructure;
        definitions: { name: string, type: any }[];
    };
    namedImports: ({
        importName: string;
        expression: ExpressionTestStructure;
        definitions: { name: string, type: any }[];
    })[];
    starImportName: string;
    starImports: ({
        importName: string;
        expression: ExpressionTestStructure;
        definitions: { name: string, type: any }[];
    })[];
}
