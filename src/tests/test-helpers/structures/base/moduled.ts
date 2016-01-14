import {Namespace} from "./../namespace";
import {Class} from "./../class";
import {Interface} from "./../interface";
import {Function} from "./../function";
import {Enum} from "./../enum";

export interface Moduled {
    namespaces?: Namespace[];
    classes?: Class[];
    interfaces?: Interface[];
    functions?: Function[];
    enums?: Enum[];
}
