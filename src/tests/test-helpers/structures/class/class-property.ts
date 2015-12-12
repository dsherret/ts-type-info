import {BaseClassProperty} from "./base";

export interface ClassProperty extends BaseClassProperty {
    isAccessor?: boolean;
    isReadonly?: boolean;
}
