import {NamedImportPartDefinition, ExportableDefinitions, ExpressionDefinition} from "./../../../definitions";
import {BaseDefinitionBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class NamedImportPartBinder implements IBaseBinder {
    constructor(private baseDefinitionBinder: BaseDefinitionBinder) {
    }

    abstract getName(): string;
    abstract getAlias(): string;
    abstract getDefinitions(): ExportableDefinitions[];
    abstract getExpression(): ExpressionDefinition;

    bind(def: NamedImportPartDefinition) {
        this.baseDefinitionBinder.bind(def);
        def.name = this.getName();
        def.alias = this.getAlias();
        def.definitions = this.getDefinitions();
        def.expression = this.getExpression();
    }
}
