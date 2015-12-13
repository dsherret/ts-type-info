import * as ts from "typescript";
import {TypeChecker, DefinitionCache} from "./../utils";
import {EnumDefinition} from "./enum";
import {ClassDefinition} from "./class";
import {FunctionDefinition} from "./function";

export class FileDefinition {
    private _name: string;
    private _classes: ClassDefinition[] = [];
    private _enums: EnumDefinition[] = [];
    private _functions: FunctionDefinition[] = [];

    constructor(typeChecker: TypeChecker, definitionCache: DefinitionCache, file: ts.SourceFile) {
        this._name = file.fileName;
        this.fillMembers(typeChecker, definitionCache, file);
    }

    fillMembers(typeChecker: TypeChecker, definitionCache: DefinitionCache, file: ts.SourceFile) {
        // classes
        typeChecker.getSymbolsInScope(file, ts.SymbolFlags.Class).forEach((classSymbol) => {
            this._classes.push(definitionCache.getClassDefinition(classSymbol));
        });

        // enums
        typeChecker.getSymbolsInScope(file, ts.SymbolFlags.Enum).forEach((enumSymbol) => {
            if (typeChecker.isSymbolInFile(enumSymbol, file)) {
                this._enums.push(definitionCache.getEnumDefinition(enumSymbol));
            }
        });

        // functions
        typeChecker.getSymbolsInScope(file, ts.SymbolFlags.Function).forEach((functionSymbol) => {
            if (typeChecker.isSymbolInFile(functionSymbol, file)) {
                this._functions.push(definitionCache.getFunctionDefinition(functionSymbol));
            }
        });
    }

    get name() {
        return this._name;
    }

    get classes() {
        return this._classes;
    }

    get enums() {
        return this._enums;
    }

    get functions() {
        return this._functions;
    }
}
