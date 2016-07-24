import {ExportableDefinitions} from "./../../../definitions";
import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {ImportBinder} from "./../../base";
import {TsBaseDefinitionBinder} from "./../base";

export class TsImportBinder extends ImportBinder {
    constructor(private factory: TsFactory, private node: TsNode) {
        super(new TsBaseDefinitionBinder());
    }

    getFileName() {
        return this.node.getFileNameOfModuleSpecifier();
    }

    getModuleSpecifier() {
        return this.node.getModuleSpecifierText();
    }

    getIsStarImport() {
        return this.node.isStarImport();
    }

    getStarImportName() {
        return this.node.getStarImportName();
    }

    getDefaultImport() {
        const defaultImportNameAndSymbol = this.node.getDefaultImportNameAndSymbol();

        if (defaultImportNameAndSymbol != null) {
            const defsOrExpression = this.factory.getDefinitionsOrExpressionFromExportSymbol(defaultImportNameAndSymbol.symbol);

            return this.factory.getDefaultImportPart({
                name: defaultImportNameAndSymbol.name,
                definitions: defsOrExpression.definitions as ExportableDefinitions[],
                expression: defsOrExpression.expression
            });
        }
        else {
            return null;
        }
    }

    getNamedImports() {
        return this.node.getImportNamedImportNodes().map(node => this.factory.getNamedImportPart(node));
    }

    getStarImports() {
        const starExportSymbols = this.node.getStarSymbol().getExportSymbolsOfModuleByName();

        return Object.keys(starExportSymbols).filter(name => name !== "default").map(name => {
            const definitions = this.factory.getAllExportableDefinitionsBySymbol(starExportSymbols[name]);

            return this.factory.getStarImportPart({
                name,
                definitions,
                expression: null
            });
        });
    }
}
