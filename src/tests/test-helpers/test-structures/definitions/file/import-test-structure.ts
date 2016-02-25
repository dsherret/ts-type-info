import {ImportType} from "./../../../../../definitions";
import {NamedTestStructure} from "./../base";

export interface ImportTestStructure extends NamedTestStructure {
    importType: ImportType;
    moduleSpecifier: string;
    definitionName: string;
    definitionType: { new(...args: any[]): NamedTestStructure; };
}
