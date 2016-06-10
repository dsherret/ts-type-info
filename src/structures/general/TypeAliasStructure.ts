import {BaseStructure, NamedStructure, ExportableStructure, TypedStructure, TypeParameteredStructure, AmbientableStructure} from "./../base";

export interface TypeAliasStructure
        extends BaseStructure, NamedStructure, ExportableStructure, TypedStructure, TypeParameteredStructure, AmbientableStructure {
    type: string; // make it required (from TypedStructure)
}
