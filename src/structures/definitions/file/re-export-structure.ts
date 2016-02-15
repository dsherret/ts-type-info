import {NamedStructure} from "./../base";

export interface ReExportStructure {
    fileName: string;
    definitionName: string;
    definitionType: { new(...args: any[]): NamedStructure };
}
