﻿import {ExportableDefinitions} from "./../../definitions";
import {BaseDefinition, DefinitionType} from "./../base";
import {ExpressionDefinition} from "./../expressions";

export class ReExportDefinition extends BaseDefinition {
    fileName: string;
    moduleSpecifier: string;
    // todo: move the array item types into a ImportPartDefinition class
    starExports: { exportName: string; definitions: ExportableDefinitions[]; expression: ExpressionDefinition }[] = [];
    namedExports: { exportName: string; definitions: ExportableDefinitions[]; expression: ExpressionDefinition }[] = [];

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
}
