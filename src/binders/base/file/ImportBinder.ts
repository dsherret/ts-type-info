import {ImportDefinition, ImportPartDefinition} from "./../../../definitions";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class ImportBinder implements IBaseBinder {
    abstract getFileName(): string;
    abstract getModuleSpecifier(): string;
    abstract getIsStarImport(): boolean;
    abstract getStarImportName(): string;
    abstract getDefaultImport(): ImportPartDefinition;
    abstract getNamedImports(): ImportPartDefinition[];
    abstract getStarImports(): ImportPartDefinition[];

    bind(def: ImportDefinition) {
        def.fileName = this.getFileName();
        def.moduleSpecifier = this.getModuleSpecifier();

        if (this.getIsStarImport()) {
            def.starImports = this.getStarImports();
            def.starImportName = this.getStarImportName();
        }
        else {
            def.defaultImport = this.getDefaultImport();
            def.namedImports = this.getNamedImports();
        }
    }
}
