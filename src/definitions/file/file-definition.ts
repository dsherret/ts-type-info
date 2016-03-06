import CodeBlockWriter from "code-block-writer";
import {applyMixins, ArrayExt, Logger} from "./../../utils";
import {MainFactory} from "./../../factories";
import {ISourceFile, INode} from "./../../wrappers";
import {Expression} from "./../../expressions";
import {ExportableDefinitions, NodeDefinitions} from "./../../definitions";
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
    defaultExport: { expression: Expression; definitions: ArrayExt<ExportableDefinitions>; };

    constructor(mainFactory: MainFactory, sourceFile: ISourceFile) {
        super(DefinitionType.File);
        this.fileName = sourceFile.getFileName();
        this.fillMembersByNode(mainFactory, sourceFile.getNode(), def => {
            if (def.isImportDefinition()) {
                def.parent = this;
                this.imports.push(def);
            }
            else if (def.isReExportDefinition()) {
                def.parent = this;
                this.reExports.push(def);
            }
            else {
                Logger.warn(`Not implemented definition: ${def.name}`);
            }
        });
        this.fillDefaultExport(mainFactory, sourceFile);
    }

    private fillDefaultExport(mainFactory: MainFactory, sourceFile: ISourceFile) {
        const symbol = sourceFile.getDefaultExportSymbol();

        if (symbol != null) {
            const defsOrExpression = mainFactory.getDefinitionsOrExpressionFromExportSymbol(symbol);
            this.defaultExport = {
                definitions: new ArrayExt<ExportableDefinitions>(...defsOrExpression.definitions),
                expression: defsOrExpression.expression
            };
        }
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
    fillMembersByNode: (mainFactory: MainFactory, node: INode, handleCustomDefinition?: (def: NodeDefinitions) => void) => void;
}

applyMixins(FileDefinition, [ModuledDefinition]);
