import {DefaultImportPartDefinition, ExportableDefinitions, ExpressionDefinition} from "./../../../definitions";
import {BaseDefinitionBinder, NodedBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class DefaultImportPartBinder implements IBaseBinder {
    constructor(
        private readonly baseDefinitionBinder: BaseDefinitionBinder,
        private readonly nodedBinder: NodedBinder
    ) {
    }

    abstract getName(): string;
    abstract getDefinitions(): ExportableDefinitions[];
    abstract getExpression(): ExpressionDefinition | null;

    bind(def: DefaultImportPartDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.nodedBinder.bind(def);
        def.name = this.getName();
        def.definitions = this.getDefinitions();
        def.expression = this.getExpression();
    }
}
