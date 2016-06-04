import {MainFactory, StructureFactory} from "./../../factories";
import {NamedImportStructureTypes} from "./../../structures";
import {DefinitionUtils} from "./../../utils";
import {ImportWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import {WriteOptions} from "./../../WriteOptions";
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

    addNamedImports(...namedImports: NamedImportStructureTypes[]) {
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
        this.defaultImport = factory.getImportPartByImportName(importName);
        return this;
    }

    write(writeOptions?: WriteOptions) {
        const writer = MainFactory.createWriter(writeOptions);
        const importWriter = new ImportWriter(writer);
        importWriter.write(this, WriteFlags.Default);
        return writer.toString();
    }
}
