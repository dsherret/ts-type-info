import {ImportPartDefinition} from "./../../../definitions";
import {StructureFactory} from "./../../../factories";
import {ImportStructure} from "./../../../structures";
import {StringUtils} from "./../../../utils";
import {ImportBinder} from "./../../base";

export class StructureImportBinder extends ImportBinder {
    constructor(private factory: StructureFactory, private structure: ImportStructure) {
        super();
    }

    getFileName() {
        return "";
    }

    getModuleSpecifier() {
        return this.structure.moduleSpecifier || "";
    }

    getIsStarImport() {
        return !StringUtils.isNullOrWhiteSpace(this.structure.starImportName);
    }

    getStarImportName() {
        return this.structure.starImportName || "";
    }

    getDefaultImport() {
        if (!StringUtils.isNullOrWhiteSpace(this.structure.defaultImportName)) {
            return this.factory.getImportPart(this.structure.defaultImportName);
        }
        else {
            return null;
        }
    }

    getNamedImports() {
        return (this.structure.namedImports || []).map(n => this.factory.getImportPart(n));
    }

    getStarImports() {
        return [] as ImportPartDefinition[];
    }
}
