import {BaseClassPropertyTestStructure} from "./base";

export interface ClassPropertyTestStructure extends BaseClassPropertyTestStructure {
    isAccessor?: boolean;
    isReadonly?: boolean;
    isConstructorParameter?: boolean;
    hasOnWriteGetBody?: boolean;
    hasOnWriteSetBody?: boolean;
}
