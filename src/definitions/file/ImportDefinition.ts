import CodeBlockWriter from "code-block-writer";
import {ImportWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
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

    write() {
        const writer = new CodeBlockWriter();
        const importWriter = new ImportWriter(writer);
        importWriter.write(this, WriteFlags.Default);
        return writer.toString();
    }
}
