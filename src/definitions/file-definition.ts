import * as ts from "typescript";
import {TypeChecker, DefinitionCache} from "./../utils";
import {ClassDefinition, FunctionDefinition} from "./../definitions";

export class FileDefinition {
    private _name: string;
    private _classes: ClassDefinition[] = [];
    private _functions: FunctionDefinition[] = [];

    constructor(typeChecker: TypeChecker, definitionCache: DefinitionCache, file: ts.SourceFile) {
        this._name = file.fileName;
        this.fillClasses(typeChecker, definitionCache, file);
    }

    fillClasses(typeChecker: TypeChecker, definitionCache: DefinitionCache, file: ts.SourceFile) {
        typeChecker.getSymbolsInScope(file, ts.SymbolFlags.Class).forEach((classSymbol) => {
            this._classes.push(definitionCache.getClassDefinition(classSymbol));
        });

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

    get functions() {
        return this._functions;
    }
}
