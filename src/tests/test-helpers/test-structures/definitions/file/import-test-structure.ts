import {NamedTestStructure} from "./../base";

export interface ImportTestStructure {
    fileName: string;
    definitionName: string;
    definitionType: { new(...args: any[]): NamedTestStructure; };
}
