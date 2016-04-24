import {ImportDefinition, ImportPartDefinition} from "./../../../definitions";
import {BaseDefinitionBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class ImportBinder implements IBaseBinder {
    constructor(private baseDefinitionBinder: BaseDefinitionBinder) {
    }

    abstract getFileName(): string;
    abstract getModuleSpecifier(): string;
    abstract getIsStarImport(): boolean;
    abstract getStarImportName(): string;
    abstract getDefaultImport(): ImportPartDefinition;
    abstract getNamedImports(): ImportPartDefinition[];
    abstract getStarImports(): ImportPartDefinition[];

    bind(def: ImportDefinition) {
        this.baseDefinitionBinder.bind(def);
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
