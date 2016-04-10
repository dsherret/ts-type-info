import {ReExportPartTestStructure} from "./ReExportPartTestStructure";

export interface ReExportTestStructure {
    moduleSpecifier: string;
    fileName: string;
    starExports: ReExportPartTestStructure[];
    namedExports: ReExportPartTestStructure[];
}
