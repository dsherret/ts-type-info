import {IBaseNamedDefinition} from "./../../../../definitions";

export interface ReExportStructure {
    fileName: string;
    definitionName: string;
    definitionType: { new(...args: any[]): IBaseNamedDefinition };
}
