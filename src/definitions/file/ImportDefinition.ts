import {MainFactory, StructureFactory} from "./../../factories";
import {NamedImportPartStructure} from "./../../structures";
import {DefinitionUtils} from "./../../utils";
import {ImportWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import {WriteOptions} from "./../../WriteOptions";
import {BaseDefinition, DefinitionType} from "./../base";
import {ImportPartDefinition} from "./ImportPartDefinition";
import {StarImportPartDefinition} from "./StarImportPartDefinition";
import {NamedImportPartDefinition} from "./NamedImportPartDefinition";

export class ImportDefinition extends BaseDefinition {
    fileName: string;
    moduleSpecifier: string;
    starImportName: string;
    defaultImport: ImportPartDefinition;
    namedImports: NamedImportPartDefinition[] = [];
    starImports: StarImportPartDefinition[] = [];

    constructor() {
        super(DefinitionType.Import);
    }

    addNamedImport(structure: NamedImportPartStructure) {
        const def = new StructureFactory().getNamedImportPart(structure);
        this.namedImports.push(def);
        return def;
    }

    getNamedImport(searchFunction: (importPart: NamedImportPartDefinition) => boolean) {
        return DefinitionUtils.getDefinitionFromListByFunc(this.namedImports, searchFunction);
    }

    getStarImport(searchFunction: (importPart: StarImportPartDefinition) => boolean) {
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
