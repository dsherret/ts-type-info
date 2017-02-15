import {ExportableDefinitions} from "./../../definitions";
import {MainFactory, StructureFactory} from "./../../factories";
import {NamedImportPartStructure} from "./../../structures";
import {DefinitionUtils, applyMixins} from "./../../utils";
import {ReExportWriter} from "./../../writers";
import {WriteOptions} from "./../../WriteOptions";
import {BaseDefinition, NodedDefinition} from "./../base";
import {StarImportPartDefinition} from "./StarImportPartDefinition";
import {NamedImportPartDefinition} from "./NamedImportPartDefinition";

export class ReExportDefinition extends BaseDefinition implements NodedDefinition {
    fileName: string;
    moduleSpecifier: string;
    starExports: StarImportPartDefinition[] = [];
    namedExports: NamedImportPartDefinition[] = [];

    getExports() {
        const exports: ExportableDefinitions[] = [];
        const handleDefinition = (definition: ExportableDefinitions) => {
            if (exports.indexOf(definition) === -1) {
                exports.push(definition);
            }
        };

        this.starExports.forEach(e => e.definitions.forEach(handleDefinition));
        this.namedExports.forEach(e => e.definitions.forEach(handleDefinition));

        return exports;
    }

    addNamedExport(structure: NamedImportPartStructure) {
        const def = new StructureFactory().getNamedImportPart(structure);
        this.namedExports.push(def);
        return def;
    }

    getNamedExport(searchFunction: (exportPart: NamedImportPartDefinition) => boolean) {
        return DefinitionUtils.getDefinitionFromListByFunc(this.namedExports, searchFunction);
    }

    getStarExport(searchFunction: (exportPart: StarImportPartDefinition) => boolean) {
        return DefinitionUtils.getDefinitionFromListByFunc(this.starExports, searchFunction);
    }

    write(writeOptions?: WriteOptions) {
        const writer = MainFactory.createWriter(writeOptions);
        const exportWriter = MainFactory.createWriteFactory(writer).getReExportWriter();
        exportWriter.write(this);
        return writer.toString();
    }
}

applyMixins(ReExportDefinition, BaseDefinition, [NodedDefinition]);
