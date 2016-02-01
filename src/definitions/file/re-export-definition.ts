import {ExportableDefinitions} from "./../../definitions";
import {FileDefinition} from "./file-definition";

export class ReExportDefinition {
    constructor(public file: FileDefinition, public definition: ExportableDefinitions) {
    }
}
