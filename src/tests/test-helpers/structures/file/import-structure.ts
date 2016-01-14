import {IBaseNamedDefinition} from "./../../../../definitions";

export interface ImportStructure {
    fileName: string;
    definitionName: string;
    definitionType: { new(...args: any[]): IBaseNamedDefinition };
}
