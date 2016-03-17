import {FileDefinition, ExportableDefinitions} from "./../../../definitions";
import {MainFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler"
import {ReExportBinder} from "./../../base";

export class TsReExportBinder extends ReExportBinder {
    constructor(private mainFactory: MainFactory, private node: TsNode) {
        super();
    }

    getFileName() {
        return this.node.getFileNameOfModuleSpecifier();
    }

    getModuleSpecifier() {
        return this.node.getModuleSpecifierText();
    }

    getIsStarExport() {
        const symbol = this.node.getSymbol();
        return symbol != null && symbol.isExportStar();
    }

    getNamedExports() {
        const namedSymbols = this.node.getNamedExportSymbolsByName();

        return Object.keys(namedSymbols || {}).map(name => {
            const defsOrExpression = this.mainFactory.getDefinitionsOrExpressionFromExportSymbol(namedSymbols[name]);

            return {
                exportName: name,
                definitions: defsOrExpression.definitions as ExportableDefinitions[],
                expression: defsOrExpression.expression
            };
        });
    }

    getStarExports() {
        const moduleSymbol = this.node.getModuleSpecifierSymbol();
        const starExportSymbols = moduleSymbol.getExportSymbolsByName();

        return Object.keys(starExportSymbols).filter(name => name !== "default").map(name => {
            const definitions = this.mainFactory.getAllExportableDefinitionsBySymbol(starExportSymbols[name]);

            return {
                exportName: name,
                definitions: definitions,
                expression: null
            };
        });
    }
}
