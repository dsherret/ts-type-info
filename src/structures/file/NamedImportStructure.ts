import {ModuleMemberDefinitions} from "./../../definitions";

export interface NamedImportStructureWithName {
    name: string;
    alias?: string;
}

export interface NamedImportStructureWithDefinition {
    definition: ModuleMemberDefinitions;
    alias?: string;
}

export interface NamedImportStructureWithDefinitions {
    definitions: ModuleMemberDefinitions[];
    alias?: string;
}

export type NamedImportStructureTypes = NamedImportStructureWithName | NamedImportStructureWithDefinition | NamedImportStructureWithDefinitions;
