import {ClassPropertyKind} from "./../../../../definitions";
import {AbstractableTestStructure} from "./../base";
import {BaseClassPropertyTestStructure} from "./base";

export interface ClassPropertyTestStructure extends BaseClassPropertyTestStructure, AbstractableTestStructure {
    kind?: ClassPropertyKind;
    hasOnWriteGetBody?: boolean;
    hasOnWriteSetBody?: boolean;
}
