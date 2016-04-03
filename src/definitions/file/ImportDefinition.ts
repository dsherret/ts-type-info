import {ExportableDefinitions} from "./../../definitions";
import {BaseDefinition, DefinitionType} from "./../base";
import {ExpressionDefinition} from "./../expressions";

export class ImportDefinition extends BaseDefinition {
    fileName: string;
    moduleSpecifier: string;
    starImportName: string;
    // todo: move the default type and array item types into a ImportPartDefinition class
    defaultImport: { importName: string; definitions: ExportableDefinitions[]; expression: ExpressionDefinition; };
    namedImports: { importName: string; definitions: ExportableDefinitions[]; expression: ExpressionDefinition; }[] = [];
    starImports: { importName: string; definitions: ExportableDefinitions[]; expression: ExpressionDefinition; }[] = [];

    constructor() {
        super(DefinitionType.Import);
    }
}
