import {ExportableDefinitions} from "./../../../definitions";
import {NamedImportPartStructure} from "./../../../structures";
import {NamedImportPartBinder} from "./../../base";
import {StructureBaseDefinitionBinder, StructureNodedBinder} from "./../base";

export class StructureNamedImportPartBinder extends NamedImportPartBinder {
    constructor(private readonly structure: NamedImportPartStructure) {
        super(
            new StructureBaseDefinitionBinder(structure),
            new StructureNodedBinder()
        );
    }

    getName() {
        return this.structure.name;
    }

    getAlias() {
        return this.structure.alias || null;
    }

    getDefinitions() {
        return [] as ExportableDefinitions[];
    }

    getExpression() {
        return null;
    }
}
