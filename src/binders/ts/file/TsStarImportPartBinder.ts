import {ExportableDefinitions, ExpressionDefinition} from "./../../../definitions";
import {TsSymbol} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {StarImportPartBinder} from "./../../base";
import {TsBaseDefinitionBinder} from "./../base";

export class TsStarImportPartBinder extends StarImportPartBinder {
    private defsOrExpression: {
        definitions: ExportableDefinitions[];
        expression: ExpressionDefinition | null;
    };

    constructor(private readonly factory: TsFactory, private readonly name: string, private readonly symbol: TsSymbol) {
        super(new TsBaseDefinitionBinder());

        this.defsOrExpression = this.factory.getDefinitionsOrExpressionFromExportSymbol(symbol);
    }

    getName() {
        return this.name || "";
    }

    getDefinitions() {
        return this.defsOrExpression.definitions;
    }

    getExpression() {
        return this.defsOrExpression.expression;
    }
}
