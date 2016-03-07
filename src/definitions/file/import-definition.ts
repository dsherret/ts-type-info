import {MainFactory} from "./../../factories";
import {ExportableDefinitions, ReExportDefinition} from "./../../definitions";
import {Expression} from "./../../expressions";
import {INode, ISymbol} from "./../../wrappers";
import {ArrayExt} from "./../../utils";
import {BaseDefinition, DefinitionType, IParentedDefinition} from "./../base";
import {FileDefinition} from "./file-definition";

export class ImportDefinition extends BaseDefinition implements IParentedDefinition<FileDefinition> {
    private starSymbol: ISymbol;
    private namedSymbols: { [name: string]: ISymbol; };
    private defaultImportNameAndSymbol: { name: string; symbol: ISymbol; };
    // todo: move the default type and array item types into a ImportPartDefinition class
    defaultImport: { importName: string; definitions: ArrayExt<ExportableDefinitions>; expression: Expression; };
    namedImports = new ArrayExt<{ importName: string; definitions: ArrayExt<ExportableDefinitions>; expression: Expression; }>();
    starImports = new ArrayExt<{ importName: string; definitions: ArrayExt<ExportableDefinitions>; expression: Expression; }>();
    starImportName: string;
    moduleSpecifier: string;
    fileName: string;

    constructor(node: INode) {
        super(DefinitionType.Import);

        this.fileName = node.getFileNameOfModuleSpecifier();
        this.moduleSpecifier = node.getModuleSpecifierText();

        if (node.isStarImport()) {
            this.starSymbol = node.getStarSymbol();
            this.starImportName = node.getStarImportName();
        }
        else {
            this.namedSymbols = node.getNamedImportSymbolsByName();
            this.defaultImportNameAndSymbol = node.getDefaultImportNameAndSymbol();
        }
    }

    fillImports(mainFactory: MainFactory) {
        this.fillStarImports(mainFactory);
        this.fillNamedImports(mainFactory);
        this.fillDefaultImport(mainFactory);

        delete this.starSymbol;
        delete this.namedSymbols;
        delete this.defaultImportNameAndSymbol;
    }

    private fillStarImports(mainFactory: MainFactory) {
        if (this.starSymbol != null) {
            const starExportSymbols = this.starSymbol.getExportSymbolsOfModuleByName();

            this.starImports.push(...Object.keys(starExportSymbols).filter(name => name !== "default").map(name => {
                const definitions = mainFactory.getAllExportableDefinitionsBySymbol(starExportSymbols[name]);

                return {
                    importName: name,
                    definitions: new ArrayExt<ExportableDefinitions>(...definitions),
                    expression: null
                };
            }));
        }
    }

    private fillNamedImports(mainFactory: MainFactory) {
        this.namedImports.push(...Object.keys(this.namedSymbols || {}).map(name => {
            const defsOrExpression = mainFactory.getDefinitionsOrExpressionFromExportSymbol(this.namedSymbols[name]);

            return {
                importName: name,
                definitions: new ArrayExt<ExportableDefinitions>(...defsOrExpression.definitions as ExportableDefinitions[]),
                expression: defsOrExpression.expression
            };
        }));
    }

    private fillDefaultImport(mainFactory: MainFactory) {
        if (this.defaultImportNameAndSymbol != null) {
            const defsOrExpression = mainFactory.getDefinitionsOrExpressionFromExportSymbol(this.defaultImportNameAndSymbol.symbol);

            this.defaultImport = {
                importName: this.defaultImportNameAndSymbol.name,
                definitions: new ArrayExt<ExportableDefinitions>(...defsOrExpression.definitions as ExportableDefinitions[]),
                expression: defsOrExpression.expression
            };
        }
    }

    // IParentedDefinition
    parent: FileDefinition;
}
