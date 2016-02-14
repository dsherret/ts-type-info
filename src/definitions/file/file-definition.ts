import CodeBlockWriter from "code-block-writer";
import {applyMixins, DefinitionCache} from "./../../utils";
import {WrappedSymbolNode} from "./../../wrappers";
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
    imports: ImportDefinition[] = [];
    reExports: ReExportDefinition[] = [];
    defaultExport: Expression | ExportableDefinitions[];

    constructor(definitionCache: DefinitionCache, symbolNode: WrappedSymbolNode) {
        super(DefinitionType.File);
        this.fileName = symbolNode.getFileName();
        this.fillMembersByNode(definitionCache, symbolNode);
        this.defaultExport = definitionCache.getDefaultExport(symbolNode);
    }

    fillImports(definitionCache: DefinitionCache, symbolNode: WrappedSymbolNode) {
        this.imports = definitionCache.getImportDefinitions(symbolNode, this);
    }

    fillReExports(definitionCache: DefinitionCache, symbolNode: WrappedSymbolNode) {
        this.reExports = definitionCache.getReExportDefinitions(symbolNode, this);
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
                if ((exportDef as ClassDefinition).methods != null) {
                    const methodDef = exportDef as ClassDefinition;
                    methodDef.methods = methodDef.methods.filter(m => m.name.indexOf("fill") !== 0 && m.name !== "addType");
                }

                if ((exportDef as ClassDefinition).properties != null) {
                    const propertyDef = exportDef as ClassDefinition;
                    propertyDef.properties = propertyDef.properties.filter(m => m.name.indexOf("fill") !== 0 && m.name !== "addType");
                }

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
    namespaces: NamespaceDefinition[];
    classes: ClassDefinition[];
    interfaces: InterfaceDefinition[];
    enums: EnumDefinition[];
    functions: FunctionDefinition[];
    variables: VariableDefinition[];
    typeAliases: TypeAliasDefinition[];
    exports: ExportableDefinitions[];
    fillMembersByNode: (definitionCache: DefinitionCache, symbolNode: WrappedSymbolNode) => void;
}

applyMixins(FileDefinition, [ModuledDefinition]);
