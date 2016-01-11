import {Namespace} from "./../namespace";

export interface Moduled {
    classes?: { name: string; isExported?: boolean }[];
    interfaces?: { name: string; isExported?: boolean }[];
    functions?: { name: string; isExported?: boolean }[];
    enums?: { name: string; isExported?: boolean }[];
    namespaces?: Namespace[];
}
