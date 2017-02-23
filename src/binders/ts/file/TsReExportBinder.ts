import {StarImportPartDefinition} from "./../../../definitions";
import {TsFactory} from "./../../../factories";
import {TsNode, NameKeyUtils} from "./../../../compiler";
import {ReExportBinder} from "./../../base";
import {TsBaseDefinitionBinder, TsNodedBinder} from "./../base";

export class TsReExportBinder extends ReExportBinder {
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

    getIsStarExport() {
        const symbol = this.node.getSymbol();
        return symbol != null && symbol.isExportStar();
    }

    getNamedExports() {
        return this.node.getReExportNamedExportNodes().map(node => this.factory.getNamedImportPart(node));
    }

    getStarExports() {
        const moduleSymbol = this.node.getModuleSpecifierSymbol();

        if (moduleSymbol == null)
            return [] as StarImportPartDefinition[];

        const starExportSymbols = moduleSymbol.getExportSymbolsByNameKeys();

        return Object.keys(starExportSymbols).filter(nameKey => NameKeyUtils.getNameFromNameKey(nameKey) !== "default").map(nameKey => {
            return this.factory.getStarImportPart(NameKeyUtils.getNameFromNameKey(nameKey), starExportSymbols[nameKey]);
        });
    }
}
