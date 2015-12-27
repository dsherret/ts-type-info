import * as ts from "typescript";
import {TypeChecker, DefinitionCache} from "./../../utils";
import {EnumDefinition} from "./../enum";
import {ClassDefinition} from "./../class";
import {FunctionDefinition} from "./../function";
import {InterfaceDefinition} from "./../interface";
import {ReExportDefinition} from "./re-export-definition";
import {ImportDefinition} from "./import-definition";

export class FileDefinition {
    private _fileName: string;
    private _classes: ClassDefinition[] = [];
    private _enums: EnumDefinition[] = [];
    private _functions: FunctionDefinition[] = [];
    private _interfaces: InterfaceDefinition[] = [];
    private _reExports: ReExportDefinition[] = [];
    private _imports: ImportDefinition[] = [];

    constructor(typeChecker: TypeChecker, definitionCache: DefinitionCache, file: ts.SourceFile) {
        this._fileName = file.fileName;
        this.fillMembers(typeChecker, definitionCache, file);
    }

    fillImports(typeChecker: TypeChecker, definitionCache: DefinitionCache, file: ts.SourceFile) {
        for (const fileImportSymbol of typeChecker.getFileImportSymbols(file)) {
            const importDefinition = definitionCache.getDefinition(fileImportSymbol);

            if (importDefinition != null) {
                this._imports.push(
                    new ImportDefinition(
                        definitionCache.getFileDefinition(typeChecker.getSourceFileOfSymbol(fileImportSymbol)),
                        importDefinition
                    )
                );
            }
            else if ((fileImportSymbol.flags & ts.SymbolFlags.BlockScopedVariable) !== 0) {
                // silently ignore
            }
            else {
                console.warn(`Not implemented import symbol: ${fileImportSymbol.name}`);
            }
        }
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

        // interfaces
        typeChecker.getSymbolsInScope(file, ts.SymbolFlags.Interface).forEach((interfaceSymbol) => {
            if (typeChecker.isSymbolInFile(interfaceSymbol, file)) {
                this._interfaces.push(definitionCache.getInterfaceDefinition(interfaceSymbol));
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

    get interfaces() {
        return this._interfaces;
    }

    get imports() {
        return this._imports;
    }

    get reExports() {
        return this._reExports;
    }
}
