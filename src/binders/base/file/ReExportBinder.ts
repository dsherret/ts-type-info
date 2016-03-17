import {ReExportDefinition, ExportableDefinitions, ExpressionDefinition} from "./../../../definitions";
import {ArrayExt} from "./../../../utils";
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

        const mapToWithArrayExt = (original: { exportName: string; definitions: ExportableDefinitions[]; expression: ExpressionDefinition; }) => {
            return {
                exportName: original.exportName,
                definitions: new ArrayExt(...original.definitions),
                expression: original.expression
            };
        };

        if (this.getIsStarExport()) {
            def.starExports = new ArrayExt(...this.getStarExports().map(mapToWithArrayExt));
        }
        else {
            def.namedExports = new ArrayExt(...this.getNamedExports().map(mapToWithArrayExt));
        }
    }
}
