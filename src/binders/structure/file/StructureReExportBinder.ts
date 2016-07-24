import {StarImportPartDefinition} from "./../../../definitions";
import {StructureFactory} from "./../../../factories";
import {ReExportStructure} from "./../../../structures";
import {ArrayUtils} from "./../../../utils";
import {ReExportBinder} from "./../../base";
import {StructureBaseDefinitionBinder} from "./../base";

export class StructureReExportBinder extends ReExportBinder {
    constructor(private factory: StructureFactory, private structure: ReExportStructure) {
        super(new StructureBaseDefinitionBinder(structure));
    }

    getFileName() {
        return "";
    }

    getModuleSpecifier() {
        return this.structure.moduleSpecifier || "";
    }

    getIsStarExport() {
        return ArrayUtils.isNullOrEmpty(this.structure.namedExports);
    }

    getNamedExports() {
        return (this.structure.namedExports || []).map(n => this.factory.getNamedImportPart(n));
    }

    getStarExports() {
        return [] as StarImportPartDefinition[];
    }
}
