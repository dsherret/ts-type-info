import {ExportableDefinitions} from "./../../../definitions";
import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {ReExportBinder} from "./../../base";
import {TsBaseDefinitionBinder} from "./../base";

export class TsReExportBinder extends ReExportBinder {
    constructor(private factory: TsFactory, private node: TsNode) {
        super(new TsBaseDefinitionBinder());
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
            const defsOrExpression = this.factory.getDefinitionsOrExpressionFromExportSymbol(namedSymbols[name]);

            return this.factory.getReExportPart({
                exportName: name,
                definitions: defsOrExpression.definitions as ExportableDefinitions[],
                expression: defsOrExpression.expression
            });
        });
    }

    getStarExports() {
        const moduleSymbol = this.node.getModuleSpecifierSymbol();
        const starExportSymbols = moduleSymbol.getExportSymbolsByName();

        return Object.keys(starExportSymbols).filter(name => name !== "default").map(name => {
            const definitions = this.factory.getAllExportableDefinitionsBySymbol(starExportSymbols[name]);

            return this.factory.getReExportPart({
                exportName: name,
                definitions: definitions,
                expression: null
            });
        });
    }
}
