import * as ts from "typescript";
import CodeBlockWriter from "code-block-writer";
import {TypeChecker, DefinitionCache, applyMixins} from "./../../utils";
import {IModuledDefinition, ModuledDefinition, IBaseNamedDefinition, IExportableDefinition} from "./../base";
import {NamespaceDefinition} from "./../namespace";
import {ClassDefinition} from "./../class";
import {InterfaceDefinition} from "./../interface";
import {EnumDefinition} from "./../enum";
import {FunctionDefinition} from "./../function";
import {VariableDefinition} from "./../variable";
import {ReExportDefinition} from "./re-export-definition";
import {ImportDefinition} from "./import-definition";
import {FileWriter} from "./../../writers";
import {WriteFlags} from "./../../write-flags";
import {writeDefinition} from "./../../write-definition";

export class FileDefinition implements IModuledDefinition {
    fileName: string;
    imports: ImportDefinition[] = [];
    reExports: ReExportDefinition[] = [];

    constructor(typeChecker: TypeChecker, definitionCache: DefinitionCache, file: ts.SourceFile) {
        this.fileName = file.fileName;
        this.fillMembersBySourceFile(typeChecker, definitionCache, file);
    }

    fillImports(typeChecker: TypeChecker, definitionCache: DefinitionCache, file: ts.SourceFile) {
        for (const fileImportSymbol of typeChecker.getFileImportSymbols(file)) {
            const importDefinition = definitionCache.getImportDefinition(fileImportSymbol);

            /* istanbul ignore else */
            if (importDefinition != null) {
                this.imports.push(
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
            const exportDefinition = definitionCache.getImportDefinition(fileReExportSymbol);

            /* istanbul ignore else */
            if (exportDefinition != null) {
                this.reExports.push(
                    new ReExportDefinition(
                        definitionCache.getFileDefinition(typeChecker.getSourceFileOfSymbol(fileReExportSymbol)),
                        exportDefinition
                    )
                );
                this.exports.push(exportDefinition);
            }
            else {
                console.warn(`Not implemented re-export symbol: ${fileReExportSymbol.name}`);
            }
        }
    }

    write() {
        const writer = new CodeBlockWriter();
        const fileWriter = new FileWriter(writer);
        fileWriter.write(this, WriteFlags.Default);
        return writer.toString();
    }

    writeExportsAsDefinitionFile(options: { definitionName: string; moduleName: string; referencePaths: string[]; }) {
        const writer = new CodeBlockWriter();
        (options.referencePaths || []).forEach(referencePath => {
            writer.writeLine(`/// <reference path="${referencePath}" />`);
        });

        writer.newLine();

        writer.write(`declare module ${options.moduleName}`).block(() => {
            this.exports.forEach((exportDef) => {
                exportDef.hasExportKeyword = false;

                if ((exportDef as ClassDefinition).methods != null) {
                    const methodDef = exportDef as InterfaceDefinition | ClassDefinition;
                    methodDef.methods = methodDef.methods.filter(m => m.name.indexOf("fill") !== 0 && m.name !== "addType");
                }

                if ((exportDef as ClassDefinition).properties != null) {
                    const propertyDef = exportDef as InterfaceDefinition | ClassDefinition;
                    propertyDef.properties = propertyDef.properties.filter(m => m.name.indexOf("fill") !== 0 && m.name !== "addType");
                }

                writeDefinition(exportDef, WriteFlags.HideFunctionBodies, writer);
                writer.newLine();
            });
        });

        writer.newLine();

        writer.write(`declare module "${options.definitionName}"`).block(() => {
            writer.write(`export = ${options.moduleName};`);
        });

        return writer.toString();
    }

    // NamedDefinition
    name: string;
    fillName: (symbol: ts.Symbol) => void;
    // ModuledDefinition
    namespaces: NamespaceDefinition[];
    classes: ClassDefinition[];
    interfaces: InterfaceDefinition[];
    enums: EnumDefinition[];
    functions: FunctionDefinition[];
    variables: VariableDefinition[];
    exports: (IBaseNamedDefinition & IExportableDefinition)[];
    fillMembersBySourceFile: (typeChecker: TypeChecker, definitionCache: DefinitionCache, node: ts.SourceFile) => void;
    fillMembersBySymbol: (typeChecker: TypeChecker, definitionCache: DefinitionCache, symbol: ts.Symbol) => void;
}

applyMixins(FileDefinition, [ModuledDefinition]);
