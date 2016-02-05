import {FileDefinition} from "./file-definition";
import {ExportableDefinitions} from "./../../definitions";
import {BaseDefinition, DefinitionType} from "./../base";

export class ImportDefinition extends BaseDefinition {
    constructor(public file: FileDefinition, public definition: ExportableDefinitions) {
        super(DefinitionType.Import);
    }
}
