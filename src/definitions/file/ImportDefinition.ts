import CodeBlockWriter from "code-block-writer";
import {StructureFactory} from "./../../factories";
import {NamedImportStructure} from "./../../structures";
import {ImportWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import {DefinitionUtils} from "./../../utils";
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

    addNamedImports(...namedImports: NamedImportStructure[]) {
        const factory = new StructureFactory();
        this.namedImports.push(...namedImports.map(n => factory.getImportPartByNamedImport(n)));
        return this;
    }

    getNamedImport(searchFunction: (importPart: ImportPartDefinition) => boolean) {
        return DefinitionUtils.getDefinitionFromListByFunc(this.namedImports, searchFunction);
    }

    getStarImport(searchFunction: (importPart: ImportPartDefinition) => boolean) {
        return DefinitionUtils.getDefinitionFromListByFunc(this.starImports, searchFunction);
    }

    setDefaultImport(importName: string) {
        const factory = new StructureFactory();
        this.defaultImport = factory.getImportPart(importName);
        return this;
    }

    write() {
        const writer = new CodeBlockWriter();
        const importWriter = new ImportWriter(writer);
        importWriter.write(this, WriteFlags.Default);
        return writer.toString();
    }
}
