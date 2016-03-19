import {ReExportDefinition, ExportableDefinitions, ExpressionDefinition} from "./../../../definitions";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class ReExportBinder implements IBaseBinder {
    abstract getFileName(): string;
    abstract getModuleSpecifier(): string;
    abstract getIsStarExport(): boolean;
    abstract getNamedExports(): { exportName: string; definitions: ExportableDefinitions[]; expression: ExpressionDefinition; }[];
    abstract getStarExports(): { exportName: string; definitions: ExportableDefinitions[]; expression: ExpressionDefinition; }[];

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
