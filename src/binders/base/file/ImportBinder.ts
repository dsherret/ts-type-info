import {ImportDefinition, ExportableDefinitions} from "./../../../definitions";
import {Expression} from "./../../../expressions";
import {ArrayExt} from "./../../../utils";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class ImportBinder implements IBaseBinder {
    constructor() {
    }

    abstract getFileName(): string;
    abstract getModuleSpecifier(): string;
    abstract getIsStarImport(): boolean;
    abstract getStarImportName(): string;
    abstract getDefaultImport(): { importName: string; definitions: ExportableDefinitions[]; expression: Expression; };
    abstract getNamedImports(): { importName: string; definitions: ExportableDefinitions[]; expression: Expression; }[];
    abstract getStarImports(): { importName: string; definitions: ExportableDefinitions[]; expression: Expression; }[];

    bind(def: ImportDefinition) {
        def.fileName = this.getFileName();
        def.moduleSpecifier = this.getModuleSpecifier();
        def.starImportName = this.getStarImportName();

        const mapToWithArrayExt = (original: { importName: string; definitions: ExportableDefinitions[]; expression: Expression; }) => {
            return {
                importName: original.importName,
                definitions: new ArrayExt(...original.definitions),
                expression: original.expression
            };
        };

        if (this.getIsStarImport()) {
            def.starImports = new ArrayExt(...this.getStarImports().map(mapToWithArrayExt));
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
