import {BaseDefinition, DefinitionType} from "./../base";
import {ImportPartDefinition} from "./ImportPartDefinition";

export class ImportDefinition extends BaseDefinition {
    fileName: string;
    moduleSpecifier: string;
    starImportName: string;
    defaultImport: ImportPartDefinition;
    namedImports: ImportPartDefinition[] = [];
    starImports: ImportPartDefinition[] = [];

    constructor() {
        super(DefinitionType.Import);
    }
}
