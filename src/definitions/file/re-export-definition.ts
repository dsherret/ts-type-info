import {IBaseNamedDefinition, IExportableDefinition} from "./../base";
import {FileDefinition} from "./file-definition";

export class ReExportDefinition {
    constructor(private _file: FileDefinition, private _definition: (IBaseNamedDefinition & IExportableDefinition)) {
    }

    get file() {
        return this._file;
    }

    get definition() {
        return this._definition;
    }
}
