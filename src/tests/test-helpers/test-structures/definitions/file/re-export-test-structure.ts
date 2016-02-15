import {NamedTestStructure} from "./../base";

export interface ReExportTestStructure {
    fileName: string;
    definitionName: string;
    definitionType: { new(...args: any[]): NamedTestStructure };
}
