import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {ImportBinder} from "./../../base";
import {TsBaseDefinitionBinder, TsNodedBinder} from "./../base";

export class TsImportBinder extends ImportBinder {
    constructor(private readonly factory: TsFactory, private readonly node: TsNode) {
        super(
            new TsBaseDefinitionBinder(),
            new TsNodedBinder(factory, node)
        );
    }

    getFileName() {
        return this.node.getFileNameOfModuleSpecifier() || "";
    }

    getModuleSpecifier() {
        return this.node.getModuleSpecifierText() || "";
    }

    getIsStarImport() {
        return this.node.isStarImport();
    }

    getStarImportName() {
        return this.node.getStarImportName() || "";
    }

    getDefaultImport() {
        const defaultImportNode = this.node.getDefaultImportNode();
        return (defaultImportNode == null) ? null : this.factory.getDefaultImportPart(defaultImportNode);
    }

    getNamedImports() {
        return this.node.getImportNamedImportNodes().map(node => this.factory.getNamedImportPart(node));
    }

    getStarImports() {
        const starExportSymbols = this.node.getStarSymbol()!.getExportSymbolsOfModuleByName();

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
