import {NamedStructure} from "./../base";

export interface ImportStructure {
    fileName: string;
    definitionName: string;
    definitionType: { new(...args: any[]): NamedStructure; };
}
