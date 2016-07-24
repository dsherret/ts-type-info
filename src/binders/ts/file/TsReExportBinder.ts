import {TsFactory} from "./../../../factories";
import {TsNode, TsSymbol} from "./../../../compiler";
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
        return this.node.getReExportNamedExportNodes().map(node => this.factory.getNamedImportPart(node));
    }

    getStarExports() {
        const moduleSymbol = this.node.getModuleSpecifierSymbol();
        const starExportSymbols = moduleSymbol == null ? ({} as { [name: string]: TsSymbol; }) : moduleSymbol.getExportSymbolsByName();

        return Object.keys(starExportSymbols).filter(name => name !== "default").map(name => {
            const {definitions, expression} = this.factory.getDefinitionsOrExpressionFromExportSymbol(starExportSymbols[name]);

            return this.factory.getStarImportPart({
                name,
                definitions,
                expression
            });
        });
    }
}
