import {ImportDefinition, ExportableDefinitions, ExpressionDefinition} from "./../../../definitions";
import {ArrayExt} from "./../../../utils";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class ImportBinder implements IBaseBinder {
    constructor() {
    }

    abstract getFileName(): string;
    abstract getModuleSpecifier(): string;
    abstract getIsStarImport(): boolean;
    abstract getStarImportName(): string;
    abstract getDefaultImport(): { importName: string; definitions: ExportableDefinitions[]; expression: ExpressionDefinition; };
    abstract getNamedImports(): { importName: string; definitions: ExportableDefinitions[]; expression: ExpressionDefinition; }[];
    abstract getStarImports(): { importName: string; definitions: ExportableDefinitions[]; expression: ExpressionDefinition; }[];

    bind(def: ImportDefinition) {
        def.fileName = this.getFileName();
        def.moduleSpecifier = this.getModuleSpecifier();

        const mapToWithArrayExt = (original: { importName: string; definitions: ExportableDefinitions[]; expression: ExpressionDefinition; }) => {
            return {
                importName: original.importName,
                definitions: new ArrayExt(...original.definitions),
                expression: original.expression
            };
        };

        if (this.getIsStarImport()) {
            def.starImports = new ArrayExt(...this.getStarImports().map(mapToWithArrayExt));
            def.starImportName = this.getStarImportName();
        }
        else {
            const defaultImport = this.getDefaultImport();

            if (defaultImport != null) {
                def.defaultImport = mapToWithArrayExt(defaultImport)
            }

            def.namedImports = new ArrayExt(...this.getNamedImports().map(mapToWithArrayExt));
        }
    }
}
