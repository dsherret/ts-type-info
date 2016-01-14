import {IBaseNamedDefinition, IExportableDefinition} from "./../base";
import {FileDefinition} from "./file-definition";

export class ImportDefinition {
    constructor(public file: FileDefinition, public definition: (IBaseNamedDefinition & IExportableDefinition)) {
    }
}
