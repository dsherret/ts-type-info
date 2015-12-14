import * as ts from "typescript";
import {TypeChecker, DefinitionCache} from "./../../utils";
import {EnumDefinition} from "./../enum";
import {ClassDefinition} from "./../class";
import {FunctionDefinition} from "./../function";
import {ReExportDefinition} from "./re-export-definition";

export class FileDefinition {
    private _fileName: string;
    private _classes: ClassDefinition[] = [];
    private _enums: EnumDefinition[] = [];
    private _functions: FunctionDefinition[] = [];
    private _reExports: ReExportDefinition[] = [];

    constructor(typeChecker: TypeChecker, definitionCache: DefinitionCache, file: ts.SourceFile) {
        this._fileName = file.fileName;
        this.fillMembers(typeChecker, definitionCache, file);
    }

    fillReExports(typeChecker: TypeChecker, definitionCache: DefinitionCache, file: ts.SourceFile) {
        for (const fileReExportSymbol of typeChecker.getFileReExportSymbols(file)) {
            const exportDefinition = definitionCache.getDefinition(fileReExportSymbol);

            if (exportDefinition != null) {
                this._reExports.push(
                    new ReExportDefinition(
                        definitionCache.getFileDefinition(typeChecker.getSourceFileOfSymbol(fileReExportSymbol)),
                        exportDefinition
                    )
                );
            }
            else {
                console.warn(`Not implemented re-export symbol: ${fileReExportSymbol.name}`);
            }
        }
    }

    private fillMembers(typeChecker: TypeChecker, definitionCache: DefinitionCache, file: ts.SourceFile) {
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

    get fileName() {
        return this._fileName;
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

    get reExports() {
        return this._reExports;
    }
}
