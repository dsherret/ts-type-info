import {ExportableDefinitions} from "./../../definitions";
import {Expression} from "./../../expressions";
import {ArrayExt} from "./../../utils";
import {BaseDefinition, DefinitionType, ParentedDefinition} from "./../base";
import {FileDefinition} from "./FileDefinition";

export class ReExportDefinition extends BaseDefinition implements ParentedDefinition<FileDefinition> {
    fileName: string;
    moduleSpecifier: string;
    // todo: move the array item types into a ImportPartDefinition class
    starExports = new ArrayExt<{ exportName: string; definitions: ArrayExt<ExportableDefinitions>; expression: Expression }>();
    namedExports = new ArrayExt<{ exportName: string; definitions: ArrayExt<ExportableDefinitions>; expression: Expression }>();

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

    // IParentedDefinition
    parent: FileDefinition;
}
