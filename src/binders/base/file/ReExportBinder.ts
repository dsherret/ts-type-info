﻿import {ReExportDefinition, ReExportPartDefinition, NamedImportPartDefinition} from "./../../../definitions";
import {BaseDefinitionBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class ReExportBinder implements IBaseBinder {
    constructor(private baseDefinitionBinder: BaseDefinitionBinder) {
    }

    abstract getFileName(): string;
    abstract getModuleSpecifier(): string;
    abstract getIsStarExport(): boolean;
    abstract getNamedExports(): NamedImportPartDefinition[];
    abstract getStarExports(): ReExportPartDefinition[];

    bind(def: ReExportDefinition) {
        this.baseDefinitionBinder.bind(def);
        def.fileName = this.getFileName();
        def.moduleSpecifier = this.getModuleSpecifier();

        if (this.getIsStarExport()) {
            def.starExports = this.getStarExports();
        }
        else {
            def.namedExports = this.getNamedExports();
        }
    }
}
