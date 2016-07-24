import {ImportDefinition, DefaultImportPartDefinition, NamedImportPartDefinition, StarImportPartDefinition} from "./../../../definitions";
import {BaseDefinitionBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class ImportBinder implements IBaseBinder {
    constructor(private baseDefinitionBinder: BaseDefinitionBinder) {
    }

    abstract getFileName(): string;
    abstract getModuleSpecifier(): string;
    abstract getIsStarImport(): boolean;
    abstract getStarImportName(): string;
    abstract getDefaultImport(): DefaultImportPartDefinition;
    abstract getNamedImports(): NamedImportPartDefinition[];
    abstract getStarImports(): StarImportPartDefinition[];

    bind(def: ImportDefinition) {
        this.baseDefinitionBinder.bind(def);
        def.fileName = this.getFileName();
        def.moduleSpecifier = this.getModuleSpecifier();
        def.defaultImport = this.getDefaultImport();

        if (this.getIsStarImport()) {
            def.starImports = this.getStarImports();
            def.starImportName = this.getStarImportName();
        }
        else {
            def.namedImports = this.getNamedImports();
        }
    }
}
