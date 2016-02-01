import {FileDefinition} from "./file-definition";
import {ExportableDefinitions} from "./../../definitions";

export class ImportDefinition {
    constructor(public file: FileDefinition, public definition: ExportableDefinitions) {
    }
}
