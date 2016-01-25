import * as ts from "typescript";
import {TypeChecker, DefinitionCache, tryGet} from "./../../utils";
import {EnumDefinition} from "./../enum";
import {ClassDefinition} from "./../class";
import {FunctionDefinition} from "./../function";
import {InterfaceDefinition} from "./../interface";
import {NamespaceDefinition} from "./../namespace";
import {VariableDefinition} from "./../variable";
import {IBaseNamedDefinition} from "./named-definition";
import {IExportableDefinition} from "./exportable-definition";

export interface IModuledDefinition {
    namespaces: NamespaceDefinition[];
    classes: ClassDefinition[];
    interfaces: InterfaceDefinition[];
    enums: EnumDefinition[];
    functions: FunctionDefinition[];
    variables: VariableDefinition[];
    exports: (IBaseNamedDefinition & IExportableDefinition)[];
    fillMembersBySourceFile(typeChecker: TypeChecker, definitionCache: DefinitionCache, node: ts.SourceFile): void;
    fillMembersBySymbol(typeChecker: TypeChecker, definitionCache: DefinitionCache, symbol: ts.Symbol): void;
}

export abstract class ModuledDefinition implements IModuledDefinition {
    namespaces: NamespaceDefinition[];
    classes: ClassDefinition[];
    interfaces: InterfaceDefinition[];
    enums: EnumDefinition[];
    functions: FunctionDefinition[];
    variables: VariableDefinition[];
    exports: (IBaseNamedDefinition & IExportableDefinition)[];

    fillMembersBySourceFile(typeChecker: TypeChecker, definitionCache: DefinitionCache, file: ts.SourceFile) {
        this.initializeMD();

        // namespaces
        typeChecker.getSymbolsInScope(file, ts.SymbolFlags.Namespace).forEach((symbol) => {
            if (typeChecker.isSymbolInFile(symbol, file)) {
                this.tryAddNamespace(definitionCache, symbol);
            }
        });

        // classes
        typeChecker.getSymbolsInScope(file, ts.SymbolFlags.Class).forEach((symbol) => {
            if (typeChecker.isSymbolInFile(symbol, file)) {
                this.tryAddClass(definitionCache, symbol);
            }
        });

        // enums
        typeChecker.getSymbolsInScope(file, ts.SymbolFlags.Enum).forEach((symbol) => {
            if (typeChecker.isSymbolInFile(symbol, file)) {
                this.tryAddEnum(definitionCache, symbol);
            }
        });

        // functions
        typeChecker.getSymbolsInScope(file, ts.SymbolFlags.Function).forEach((symbol) => {
            if (typeChecker.isSymbolInFile(symbol, file)) {
                this.tryAddFunction(definitionCache, symbol);
            }
        });

        // interfaces
        typeChecker.getSymbolsInScope(file, ts.SymbolFlags.Interface).forEach((symbol) => {
            if (typeChecker.isSymbolInFile(symbol, file)) {
                this.tryAddInterface(definitionCache, symbol);
            }
        });

        // variables (I don't think ts.SymbolFlags.FunctionScopedVariable is necessary here because a variable wouldn't be function on the file level)
        typeChecker.getSymbolsInScope(file, ts.SymbolFlags.BlockScopedVariable | ts.SymbolFlags.Variable).forEach((symbol) => {
            if (typeChecker.isSymbolInFile(symbol, file)) {
                this.tryAddVariable(definitionCache, symbol);
            }
        });
    }

    fillMembersBySymbol(typeChecker: TypeChecker, definitionCache: DefinitionCache, symbol: ts.Symbol) {
        this.initializeMD();
        const declaration = typeChecker.getDeclarationFromSymbol(symbol);
        const localSymbols = typeChecker.getLocalSymbolsFromDeclaration(declaration);

        localSymbols.forEach(localSymbol => {
            if (typeChecker.isSymbolClass(localSymbol)) {
                this.tryAddClass(definitionCache, localSymbol);
            }
            else if (typeChecker.isSymbolInterface(localSymbol)) {
                this.tryAddInterface(definitionCache, localSymbol);
            }
            else if (typeChecker.isSymbolFunction(localSymbol)) {
                this.tryAddFunction(definitionCache, localSymbol);
            }
            else if (typeChecker.isSymbolNamespace(localSymbol)) {
                this.tryAddNamespace(definitionCache, localSymbol);
            }
            else if (typeChecker.isSymbolEnum(localSymbol)) {
                this.tryAddEnum(definitionCache, localSymbol);
            }
            else if (typeChecker.isSymbolVariable(localSymbol)) {
                this.tryAddVariable(definitionCache, localSymbol);
            }
            else {
                console.warn(`Unhandled symbol when filling moduled definition items: ${localSymbol.name}`);
            }
        });
    }

    private tryAddNamespace(definitionCache: DefinitionCache, symbol: ts.Symbol) {
        tryGet(symbol, () => definitionCache.getNamespaceDefinition(symbol), (def) => {
            this.namespaces.push(def);
            this.checkAddToExports(def);
        });
    }

    private tryAddClass(definitionCache: DefinitionCache, symbol: ts.Symbol) {
        tryGet(symbol, () => definitionCache.getClassDefinition(symbol), (def) => {
            this.classes.push(def);
            this.checkAddToExports(def);
        });
    }

    private tryAddEnum(definitionCache: DefinitionCache, symbol: ts.Symbol) {
        tryGet(symbol, () => definitionCache.getEnumDefinition(symbol), (def) => {
            this.enums.push(def);
            this.checkAddToExports(def);
        });
    }

    private tryAddFunction(definitionCache: DefinitionCache, symbol: ts.Symbol) {
        tryGet(symbol, () => definitionCache.getFunctionDefinition(symbol), (def) => {
            this.functions.push(def);
            this.checkAddToExports(def);
        });
    }

    private tryAddInterface(definitionCache: DefinitionCache, symbol: ts.Symbol) {
        tryGet(symbol, () => definitionCache.getInterfaceDefinition(symbol), (def) => {
            this.interfaces.push(def);
            this.checkAddToExports(def);
        });
    }

    private tryAddVariable(definitionCache: DefinitionCache, symbol: ts.Symbol) {
        tryGet(symbol, () => definitionCache.getVariableDefinition(symbol), (def) => {
            this.variables.push(def);
            this.checkAddToExports(def);
        });
    }

    private checkAddToExports(def: IBaseNamedDefinition & IExportableDefinition) {
        if (def.isExported) {
            this.exports.push(def);
        }
    }

    private initializeMD() {
        this.namespaces = [];
        this.classes = [];
        this.interfaces = [];
        this.enums = [];
        this.functions = [];
        this.variables = [];
        this.exports = [];
    }
}
