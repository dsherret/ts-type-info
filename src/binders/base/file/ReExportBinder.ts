import {ReExportDefinition, ReExportPartDefinition} from "./../../../definitions";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class ReExportBinder implements IBaseBinder {
    abstract getFileName(): string;
    abstract getModuleSpecifier(): string;
    abstract getIsStarExport(): boolean;
    abstract getNamedExports(): ReExportPartDefinition[];
    abstract getStarExports(): ReExportPartDefinition[];

    bind(def: ReExportDefinition) {
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
