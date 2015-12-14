import {IBaseNamedDefinition} from "./../../../definitions";

export interface ReExport {
    fileName: string;
    definitionName: string;
    definitionType: { new(...args: any[]): IBaseNamedDefinition };
}
