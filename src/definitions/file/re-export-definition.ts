import {MainFactory} from "./../../factories";
import {ExportableDefinitions} from "./../../definitions";
import {Expression} from "./../../expressions";
import {INode, ISymbol} from "./../../wrappers";
import {ArrayExt} from "./../../utils";
import {BaseDefinition, DefinitionType, IParentedDefinition} from "./../base";
import {FileDefinition} from "./file-definition";

export class ReExportDefinition extends BaseDefinition implements IParentedDefinition<FileDefinition> {
    private starExportSymbols: { [name: string]: ISymbol; };
    private namedExportSymbols: { [name: string]: ISymbol; };
    // todo: move the array item types into a ImportPartDefinition class
    starExports = new ArrayExt<{ exportName: string; definitions: ArrayExt<ExportableDefinitions>; expression: Expression }>();
    namedExports = new ArrayExt<{ exportName: string; definitions: ArrayExt<ExportableDefinitions>; expression: Expression }>();
    fileName: string;
    moduleSpecifier: string;

    constructor(node: INode) {
        super(DefinitionType.ReExport);
        const symbol = node.getSymbol();

        this.fileName = node.getFileNameOfModuleSpecifier();
        this.moduleSpecifier = node.getModuleSpecifierText();

        if (symbol != null && symbol.isExportStar()) {
            this.handleExportStar(node);
        }
        else {
            this.handleNamedExports(node);
        }
    }

    fillExports(mainFactory: MainFactory) {
        this.fillExportsForNamed(mainFactory);
        this.fillExportsForStar(mainFactory);

        delete this.starExportSymbols;
        delete this.namedExportSymbols;
    }

    private handleExportStar(node: INode) {
        const moduleSymbol = node.getModuleSpecifierSymbol();
        this.starExportSymbols = moduleSymbol.getExportSymbolsByName();
    }

    private handleNamedExports(node: INode) {
        this.namedExportSymbols = node.getNamedExportSymbolsByName();
    }

    private fillExportsForNamed(mainFactory: MainFactory) {
        this.namedExports.push(...Object.keys(this.namedExportSymbols || {}).filter(name => name !== "default").map(name => {
            const defsOrExpression = mainFactory.getDefinitionsOrExpressionFromExportSymbol(this.namedExportSymbols[name]);

            return {
                exportName: name,
                definitions: new ArrayExt<ExportableDefinitions>(...defsOrExpression.definitions),
                expression: defsOrExpression.expression
            };
        }));
    }

    private fillExportsForStar(mainFactory: MainFactory) {
        this.starExports.push(...Object.keys(this.starExportSymbols || {}).filter(name => name !== "default").map(name => {
            const definitions = mainFactory.getAllDefinitionsBySymbol(this.starExportSymbols[name]) as ExportableDefinitions[];

            return {
                exportName: name,
                definitions: new ArrayExt<ExportableDefinitions>(...definitions),
                expression: null
            };
        }));
    }

    // IParentedDefinition
    parent: FileDefinition;
}
