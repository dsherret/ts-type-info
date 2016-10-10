import {ExportableDefinitions, ExpressionDefinition} from "./../../../definitions";
import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {DefaultImportPartBinder} from "./../../base";
import {TsBaseDefinitionBinder, TsNodedBinder} from "./../base";

export class TsDefaultImportPartBinder extends DefaultImportPartBinder {
    private defsOrExpression: {
        definitions: ExportableDefinitions[];
        expression: ExpressionDefinition | null;
    };

    constructor(private readonly factory: TsFactory, private readonly node: TsNode) {
        super(
            new TsBaseDefinitionBinder(),
            new TsNodedBinder(factory, node)
        );

        const symbol = node.getSymbol()!.getAliasSymbol()!;
        this.defsOrExpression = this.factory.getDefinitionsOrExpressionFromExportSymbol(symbol);
    }

    getName() {
        return this.node.getText() || "";
    }

    getDefinitions() {
        return this.defsOrExpression.definitions;
    }

    getExpression() {
        return this.defsOrExpression.expression;
    }
}
