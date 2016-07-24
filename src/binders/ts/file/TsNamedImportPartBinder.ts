import {ExportableDefinitions, ExpressionDefinition} from "./../../../definitions";
import {TsFactory} from "./../../../factories";
import {NamedImportPartStructure} from "./../../../structures";
import {NamedImportPartBinder} from "./../../base";
import {TsBaseDefinitionBinder} from "./../base";
import {TsNode, TsSymbol} from "./../../../compiler";

export class TsNamedImportPartBinder extends NamedImportPartBinder {
    private defsOrExpression: {
        definitions: ExportableDefinitions[];
        expression: ExpressionDefinition;
    };

    constructor(private factory: TsFactory, private node: TsNode) {
        super(new TsBaseDefinitionBinder());
        this.defsOrExpression = this.factory.getDefinitionsOrExpressionFromExportSymbol(node.getSymbol());
    }

    getName() {
        return this.node.getNamedImportPropertyName() || this.node.getNamedImportName();
    }

    getAlias() {
        return this.node.getNamedImportPropertyName() == null ? null : this.node.getNamedImportName();
    }

    getDefinitions() {
        return this.defsOrExpression.definitions;
    }

    getExpression() {
        return this.defsOrExpression.expression;
    }
}
