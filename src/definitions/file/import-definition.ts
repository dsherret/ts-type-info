import {FileDefinition} from "./file-definition";
import {ExportedDefinitions} from "./../../definitions";

export class ImportDefinition {
    constructor(public file: FileDefinition, public definition: ExportedDefinitions) {
    }
}
