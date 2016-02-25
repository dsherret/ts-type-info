import {FileDefinition} from "./file-definition";
import {ImportType} from "./import-type";
import {ExportableDefinitions, IBaseNamedDefinition} from "./../../definitions";
import {IImportClause} from "./../../wrappers";
import {BaseDefinition, DefinitionType, IParentedDefinition} from "./../base";

export class ImportDefinition extends BaseDefinition implements IParentedDefinition<FileDefinition>, IBaseNamedDefinition {
    public importType: ImportType;
    public name: string;
    public moduleSpecifier: string;

    constructor(importClause: IImportClause, public definition: ExportableDefinitions, parent: FileDefinition) {
        super(DefinitionType.Import);

        this.name = importClause.getName();
        this.importType = importClause.getImportType();
        this.moduleSpecifier = importClause.getModuleSpecifier();
        this.parent = parent;
    }

    // IParentedDefinition
    parent: FileDefinition;
}
