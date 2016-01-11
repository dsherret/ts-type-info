import * as ts from "typescript";
import {TypeChecker, DefinitionCache, applyMixins} from "./../../utils";
import {IModuledDefinition, ModuledDefinition} from "./../base";
import {NamespaceDefinition} from "./../namespace";
import {EnumDefinition} from "./../enum";
import {ClassDefinition} from "./../class";
import {FunctionDefinition} from "./../function";
import {InterfaceDefinition} from "./../interface";
import {ReExportDefinition} from "./re-export-definition";
import {ImportDefinition} from "./import-definition";

export class FileDefinition implements IModuledDefinition {
    private _fileName: string;
    private _reExports: ReExportDefinition[] = [];
    private _imports: ImportDefinition[] = [];

    constructor(typeChecker: TypeChecker, definitionCache: DefinitionCache, file: ts.SourceFile) {
        this._fileName = file.fileName;
        this.fillMembersBySourceFile(typeChecker, definitionCache, file);
    }

    fillImports(typeChecker: TypeChecker, definitionCache: DefinitionCache, file: ts.SourceFile) {
        for (const fileImportSymbol of typeChecker.getFileImportSymbols(file)) {
            const importDefinition = definitionCache.getDefinition(fileImportSymbol);

            /* istanbul ignore else */
            if (importDefinition != null) {
                this._imports.push(
                    new ImportDefinition(
                        definitionCache.getFileDefinition(typeChecker.getSourceFileOfSymbol(fileImportSymbol)),
                        importDefinition
                    )
                );
            }
            else {
                console.warn(`Not implemented import symbol: ${fileImportSymbol.name}`);
            }
        }
    }

    fillReExports(typeChecker: TypeChecker, definitionCache: DefinitionCache, file: ts.SourceFile) {
        for (const fileReExportSymbol of typeChecker.getFileReExportSymbols(file)) {
            const exportDefinition = definitionCache.getDefinition(fileReExportSymbol);

            /* istanbul ignore else */
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

    get fileName() {
        return this._fileName;
    }

    get imports() {
        return this._imports;
    }

    get reExports() {
        return this._reExports;
    }

    // NamedDefinition
    fillName: (symbol: ts.Symbol) => void;
    name: string;
    // ModuledDefinition
    fillMembersBySourceFile: (typeChecker: TypeChecker, definitionCache: DefinitionCache, node: ts.SourceFile) => void;
    fillMembersBySymbol: (typeChecker: TypeChecker, definitionCache: DefinitionCache, symbol: ts.Symbol) => void;
    classes: ClassDefinition[];
    interfaces: InterfaceDefinition[];
    enums: EnumDefinition[];
    functions: FunctionDefinition[];
    namespaces: NamespaceDefinition[];
}

applyMixins(FileDefinition, [ModuledDefinition]);
