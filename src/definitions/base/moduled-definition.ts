import * as ts from "typescript";
import {TypeChecker, DefinitionCache} from "./../../utils";
import {EnumDefinition} from "./../enum";
import {ClassDefinition} from "./../class";
import {FunctionDefinition} from "./../function";
import {InterfaceDefinition} from "./../interface";
import {NamespaceDefinition} from "./../namespace";

export interface IModuledDefinition {
    fillMembersBySourceFile(typeChecker: TypeChecker, definitionCache: DefinitionCache, node: ts.SourceFile): void;
    fillMembersBySymbol(typeChecker: TypeChecker, definitionCache: DefinitionCache, symbol: ts.Symbol): void;
    classes: ClassDefinition[];
    interfaces: InterfaceDefinition[];
    enums: EnumDefinition[];
    functions: FunctionDefinition[];
    namespaces: NamespaceDefinition[];
}

export abstract class ModuledDefinition implements IModuledDefinition {
    namespaces: NamespaceDefinition[];
    classes: ClassDefinition[];
    enums: EnumDefinition[];
    functions: FunctionDefinition[];
    interfaces: InterfaceDefinition[];

    fillMembersBySourceFile(typeChecker: TypeChecker, definitionCache: DefinitionCache, file: ts.SourceFile) {
        this.initializeMD();
        // classes
        typeChecker.getSymbolsInScope(file, ts.SymbolFlags.Class).forEach((classSymbol) => {
            if (typeChecker.isSymbolInFile(classSymbol, file)) {
                this.classes.push(definitionCache.getClassDefinition(classSymbol));
            }
        });

        // enums
        typeChecker.getSymbolsInScope(file, ts.SymbolFlags.Enum).forEach((enumSymbol) => {
            if (typeChecker.isSymbolInFile(enumSymbol, file)) {
                this.enums.push(definitionCache.getEnumDefinition(enumSymbol));
            }
        });

        // functions
        typeChecker.getSymbolsInScope(file, ts.SymbolFlags.Function).forEach((functionSymbol) => {
            if (typeChecker.isSymbolInFile(functionSymbol, file)) {
                this.functions.push(definitionCache.getFunctionDefinition(functionSymbol));
            }
        });

        // interfaces
        typeChecker.getSymbolsInScope(file, ts.SymbolFlags.Interface).forEach((interfaceSymbol) => {
            if (typeChecker.isSymbolInFile(interfaceSymbol, file)) {
                this.interfaces.push(definitionCache.getInterfaceDefinition(interfaceSymbol));
            }
        });

        // namespaces
        typeChecker.getSymbolsInScope(file, ts.SymbolFlags.Namespace).forEach((namespaceSymbol) => {
            if (typeChecker.isSymbolInFile(namespaceSymbol, file)) {
                this.namespaces.push(definitionCache.getNamespaceDefinition(namespaceSymbol));
            }
        });
    }

    fillMembersBySymbol(typeChecker: TypeChecker, definitionCache: DefinitionCache, symbol: ts.Symbol) {
        this.initializeMD();
        const declaration = typeChecker.getDeclarationFromSymbol(symbol);
        const localSymbols = typeChecker.getLocalSymbolsFromDeclaration(declaration);

        localSymbols.forEach(localSymbol => {
            if (typeChecker.isSymbolClass(localSymbol)) {
                this.classes.push(definitionCache.getClassDefinition(localSymbol));
            }
            else if (typeChecker.isSymbolInterface(localSymbol)) {
                this.interfaces.push(definitionCache.getInterfaceDefinition(localSymbol));
            }
            else if (typeChecker.isSymbolFunction(localSymbol)) {
                this.functions.push(definitionCache.getFunctionDefinition(localSymbol));
            }
            else if (typeChecker.isSymbolNamespace(localSymbol)) {
                this.namespaces.push(definitionCache.getNamespaceDefinition(localSymbol));
            }
            else if (typeChecker.isSymbolEnum(localSymbol)) {
                this.enums.push(definitionCache.getEnumDefinition(localSymbol));
            }
            else {
                // console.log(symbol);
                console.warn(`Unhandled symbol when filling moduled definition items: ${localSymbol.name}`);
            }
        });
    }

    private initializeMD() {
        this.namespaces = [];
        this.classes = [];
        this.enums = [];
        this.functions = [];
        this.interfaces = [];
    }
}
