import {BaseStructure, NamedStructure, ExportableStructure, TypedStructure, TypeParameteredStructure, AmbientableStructure, DocumentationedStructure} from "./../base";

export interface TypeAliasStructure
        extends BaseStructure, NamedStructure, ExportableStructure, TypedStructure, TypeParameteredStructure, AmbientableStructure, DocumentationedStructure {
    type: string; // make it required (from TypedStructure)
}
