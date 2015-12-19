import {IBaseNamedDefinition} from "./../../../../definitions";

export interface Import {
    fileName: string;
    definitionName: string;
    definitionType: { new(...args: any[]): IBaseNamedDefinition };
}
