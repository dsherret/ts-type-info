import CodeBlockWriter from "code-block-writer";
import {applyMixins, ArrayExt} from "./../../utils";
import {MainFactory} from "./../../factories";
import {ISourceFile, ISymbolNode} from "./../../wrappers";
import {Expression} from "./../../expressions";
import {ExportableDefinitions} from "./../../definitions";
import {FileWriter} from "./../../writers";
import {WriteFlags} from "./../../write-flags";
import {writeDefinition} from "./../../write-definition";
import {IModuledDefinition, ModuledDefinition, BaseDefinition, DefinitionType} from "./../base";
import {NamespaceDefinition} from "./../namespace";
import {ClassDefinition} from "./../class";
import {InterfaceDefinition} from "./../interface";
import {EnumDefinition} from "./../enum";
import {FunctionDefinition} from "./../function";
import {VariableDefinition} from "./../variable";
import {TypeAliasDefinition} from "./../general";
import {ReExportDefinition} from "./re-export-definition";
import {ImportDefinition} from "./import-definition";

export class FileDefinition extends BaseDefinition implements IModuledDefinition {
    fileName: string;
    imports = new ArrayExt<ImportDefinition>();
    reExports = new ArrayExt<ReExportDefinition>();
    defaultExport: Expression | ArrayExt<ExportableDefinitions>;

    constructor(mainFactory: MainFactory, sourceFile: ISourceFile) {
        super(DefinitionType.File);
        this.fileName = sourceFile.getFileName();
        this.fillMembersBySymbolNode(mainFactory, sourceFile);
        this.defaultExport = mainFactory.getDefinitionsOrExpressionFromSymbol(sourceFile.getDefaultExportSymbol());
    }

    fillImports(mainFactory: MainFactory, sourceFile: ISourceFile) {
        sourceFile.getFileImportSymbols().map(fileImportSymbol => {
            this.imports.push(...mainFactory.getImportDefinitions({
                symbol: fileImportSymbol,
                parent: this
            }));
        });
    }

    fillReExports(mainFactory: MainFactory, sourceFile: ISourceFile) {
        sourceFile.getFileReExportSymbols().map(reExportSymbol => {
            this.reExports.push(...mainFactory.getReExportDefinitions({
                symbol: reExportSymbol,
                parent: this
            }));
        });
        this.exports.push(...this.reExports.map(reExport => reExport.definition));
    }

    write() {
        const writer = new CodeBlockWriter();
        const fileWriter = new FileWriter(writer, WriteFlags.Default);
        fileWriter.write(this);
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
                exportDef.isExported = false;
                exportDef.isNamedExportOfFile = false;
                exportDef.isDefaultExportOfFile = false;

                writeDefinition(exportDef, writer, WriteFlags.HideFunctionBodies | WriteFlags.HideExpressions | WriteFlags.HidePrivateMembers | WriteFlags.HideProtectedMembers);
                writer.newLine();
            });
        });

        writer.newLine();

        writer.write(`declare module "${options.definitionName}"`).block(() => {
            writer.write(`export = ${options.moduleName};`);
        });

        return writer.toString();
    }

    // ModuledDefinition
    namespaces: ArrayExt<NamespaceDefinition>;
    classes: ArrayExt<ClassDefinition>;
    interfaces: ArrayExt<InterfaceDefinition>;
    enums: ArrayExt<EnumDefinition>;
    functions: ArrayExt<FunctionDefinition>;
    variables: ArrayExt<VariableDefinition>;
    typeAliases: ArrayExt<TypeAliasDefinition>;
    exports: ArrayExt<ExportableDefinitions>;
    fillMembersBySymbolNode: (mainFactory: MainFactory, symbolNode: ISymbolNode) => void;
}

applyMixins(FileDefinition, [ModuledDefinition]);
