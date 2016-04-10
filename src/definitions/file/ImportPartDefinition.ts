import {ExportableDefinitions} from "./../../definitions";
import {BaseDefinition, DefinitionType} from "./../base";
import {ExpressionDefinition} from "./../expressions";

export class ImportPartDefinition extends BaseDefinition {
    constructor() {
        super(DefinitionType.ImportPart);
    }

    importName: string;
    definitions: ExportableDefinitions[];
    expression: ExpressionDefinition;
}
