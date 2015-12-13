import {EnumMember} from "./enum-member";

export interface Enum {
    name: string;
    isExported?: boolean;
    members: EnumMember[];
}
