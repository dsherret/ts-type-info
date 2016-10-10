import {NamedImportPartDefinition, ExportableDefinitions, ExpressionDefinition} from "./../../../definitions";
import {BaseDefinitionBinder, NodedBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class NamedImportPartBinder implements IBaseBinder {
    constructor(
        private readonly baseDefinitionBinder: BaseDefinitionBinder,
        private readonly nodedBinder: NodedBinder
    ) {
    }

    abstract getName(): string;
    abstract getAlias(): string | null;
    abstract getDefinitions(): ExportableDefinitions[];
    abstract getExpression(): ExpressionDefinition | null;

    bind(def: NamedImportPartDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.nodedBinder.bind(def);
        def.name = this.getName();
        def.alias = this.getAlias();
        def.definitions = this.getDefinitions();
        def.expression = this.getExpression();
    }
}
