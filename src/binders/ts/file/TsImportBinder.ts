import {ExportableDefinitions} from "./../../../definitions";
import {MainFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {ImportBinder} from "./../../base";

export class TsImportBinder extends ImportBinder {
    constructor(private mainFactory: MainFactory, private node: TsNode) {
        super();
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
            const defsOrExpression = this.mainFactory.getDefinitionsOrExpressionFromExportSymbol(defaultImportNameAndSymbol.symbol);

            return {
                importName: defaultImportNameAndSymbol.name,
                definitions: defsOrExpression.definitions as ExportableDefinitions[],
                expression: defsOrExpression.expression
            };
        }
        else {
            return null;
        }
    }

    getNamedImports() {
        const namedSymbols = this.node.getNamedImportSymbolsByName();

        return Object.keys(namedSymbols || {}).map(name => {
            const defsOrExpression = this.mainFactory.getDefinitionsOrExpressionFromExportSymbol(namedSymbols[name]);

            return {
                importName: name,
                definitions: defsOrExpression.definitions as ExportableDefinitions[],
                expression: defsOrExpression.expression
            };
        });
    }

    getStarImports() {
        const starExportSymbols = this.node.getStarSymbol().getExportSymbolsOfModuleByName();

        return Object.keys(starExportSymbols).filter(name => name !== "default").map(name => {
            const definitions = this.mainFactory.getAllExportableDefinitionsBySymbol(starExportSymbols[name]);

            return {
                importName: name,
                definitions: definitions,
                expression: null
            };
        });
    }
}
