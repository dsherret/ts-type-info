import {NamedStructure} from "./NamedStructure";
import {OptionalStructure} from "./OptionalStructure";
import {TypedStructure} from "./TypedStructure";
import {BaseStructure} from "./BaseStructure";
import {ReadonlyableStructure} from "./ReadonlyableStructure";

export interface BasePropertyStructure extends BaseStructure, NamedStructure, OptionalStructure, TypedStructure, ReadonlyableStructure {
}
