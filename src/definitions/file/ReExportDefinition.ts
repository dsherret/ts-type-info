import CodeBlockWriter from "code-block-writer";
import {ExportableDefinitions} from "./../../definitions";
import {StructureFactory} from "./../../factories";
import {NamedImportStructure} from "./../../structures";
import {ReExportWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import {DefinitionUtils} from "./../../utils";
import {BaseDefinition, DefinitionType} from "./../base";
import {ReExportPartDefinition} from "./ReExportPartDefinition";

export class ReExportDefinition extends BaseDefinition {
    fileName: string;
    moduleSpecifier: string;
    starExports: ReExportPartDefinition[] = [];
    namedExports: ReExportPartDefinition[] = [];

    constructor() {
        super(DefinitionType.ReExport);
    }

    getExports() {
        const exports: ExportableDefinitions[] = [];
        const handleDefinition = (definition: ExportableDefinitions) => exports.push(definition);

        this.starExports.forEach(e => e.definitions.forEach(handleDefinition));
        this.namedExports.forEach(e => e.definitions.forEach(handleDefinition));

        return exports;
    }

    addNamedExports(...namedExports: NamedImportStructure[]) {
        const factory = new StructureFactory();
        this.namedExports.push(...namedExports.map(n => factory.getReExportPartByNamedImport(n)));
        return this;
    }

    getNamedExport(searchFunction: (exportPart: ReExportPartDefinition) => boolean) {
        return DefinitionUtils.getDefinitionFromListByFunc(this.namedExports, searchFunction);
    }

    getStarExport(searchFunction: (exportPart: ReExportPartDefinition) => boolean) {
        return DefinitionUtils.getDefinitionFromListByFunc(this.starExports, searchFunction);
    }

    write() {
        const writer = new CodeBlockWriter();
        const exportWriter = new ReExportWriter(writer);
        exportWriter.write(this, WriteFlags.Default);
        return writer.toString();
    }
}
