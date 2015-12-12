import {BaseClassProperty} from "./base";

export interface StaticProperty extends BaseClassProperty {
    isAccessor?: boolean;
    isReadonly?: boolean;
}
