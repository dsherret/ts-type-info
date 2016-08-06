import {AbstractableTestStructure} from "./../base";
import {BaseClassPropertyTestStructure} from "./base";

export interface ClassPropertyTestStructure extends BaseClassPropertyTestStructure, AbstractableTestStructure {
    isAccessor?: boolean;
    isReadonly?: boolean;
    hasOnWriteGetBody?: boolean;
    hasOnWriteSetBody?: boolean;
}
