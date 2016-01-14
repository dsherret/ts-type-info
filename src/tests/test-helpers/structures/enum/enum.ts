import {Named, Exportable} from "./../base";
import {EnumMember} from "./enum-member";

export interface Enum extends Named, Exportable {
    members?: EnumMember[];
}
