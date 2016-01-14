import {IBaseNamedDefinition, IExportableDefinition} from "./../base";
import {FileDefinition} from "./file-definition";

export class ReExportDefinition {
    constructor(public file: FileDefinition, public definition: (IBaseNamedDefinition & IExportableDefinition)) {
    }
}
