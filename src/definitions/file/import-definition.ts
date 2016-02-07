import {FileDefinition} from "./file-definition";
import {ExportableDefinitions} from "./../../definitions";
import {BaseDefinition, DefinitionType, IParentedDefinition} from "./../base";

export class ImportDefinition extends BaseDefinition implements IParentedDefinition<FileDefinition> {
    constructor(public file: FileDefinition, public definition: ExportableDefinitions, parent: FileDefinition) {
        super(DefinitionType.Import);

        this.parent = parent;
    }

    // IParentedDefinition
    parent: FileDefinition;
}
