import {ExportableDefinitions} from "./../../../definitions";
import {DefaultImportPartBinder} from "./../../base";
import {StructureBaseDefinitionBinder, StructureNodedBinder} from "./../base";

export class StructureDefaultImportPartBinder extends DefaultImportPartBinder {
    constructor(private readonly name: string) {
        super(
            new StructureBaseDefinitionBinder({}),
            new StructureNodedBinder()
        );
    }

    getName() {
        return this.name;
    }

    getDefinitions() {
        return [] as ExportableDefinitions[];
    }

    getExpression() {
        return null;
    }
}
