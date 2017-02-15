import * as path from "path";
import * as typeConstants from "./../../typeConstants";
import {ExportableDefinitions, ModuleMemberDefinitions} from "./../../definitions";
import {MainFactory, StructureFactory} from "./../../factories";
import {ClassStructure, EnumStructure, FunctionStructure, ImportStructure, InterfaceStructure, NamespaceStructure, ReExportStructure, TypeAliasStructure,
    VariableStructure} from "./../../structures";
import {applyMixins, DefinitionUtils, validateImportStructure, FileUtils, StringUtils} from "./../../utils";
import {WriteFlags} from "./../../WriteFlags";
import {WriteOptions} from "./../../WriteOptions";
import {writeDefinition} from "./../../writeDefinition";
import {ModuledDefinition, NodedDefinition, BaseDefinition} from "./../base";
import {ExpressionDefinition} from "./../expression";
import {NamespaceDefinition} from "./../namespace";
import {ClassDefinition} from "./../class";
import {InterfaceDefinition} from "./../interface";
import {EnumDefinition} from "./../enum";
import {FunctionDefinition} from "./../function";
import {VariableDefinition} from "./../variable";
import {TypeAliasDefinition} from "./../general";
import {ReExportDefinition} from "./ReExportDefinition";
import {ImportDefinition} from "./ImportDefinition";

export class FileDefinition extends BaseDefinition implements ModuledDefinition, NodedDefinition {
    fileName: string;
    imports: ImportDefinition[] = [];
    reExports: ReExportDefinition[] = [];
    defaultExportExpression: ExpressionDefinition | null;

    addImport(structure: ImportStructure) {
        validateImportStructure(structure);
        const def = new StructureFactory().getImport(structure);
        this.imports.push(def);
        return def;
    }

    addReExport(structure: ReExportStructure) {
        const def = new StructureFactory().getReExport(structure);
        this.reExports.push(def);
        return def;
    }

    getModuleSpecifierToFile(file: FileDefinition) {
        if (StringUtils.isNullOrWhiteSpace(file.fileName) || StringUtils.isNullOrWhiteSpace(this.fileName)) {
            throw new Error("The files being compared must both have a fileName.");
        }

        const fileNameFrom = FileUtils.standardizeSlashes(this.fileName);
        const fileNameTo = FileUtils.standardizeSlashes(file.fileName);
        const relativePath = path.relative(path.dirname(fileNameFrom), path.dirname(fileNameTo));
        const fullPath = path.join(relativePath, path.basename(fileNameTo));
        const fullPathWithoutExtension = fullPath.replace(/\.[^/.]+$/, "");

        return "./" + FileUtils.standardizeSlashes(fullPathWithoutExtension);
    }

    getImport(searchFunction: (importDef: ImportDefinition) => boolean) {
        return DefinitionUtils.getDefinitionFromListByFunc(this.imports, searchFunction);
    }

    getReExport(searchFunction: (reExportDef: ReExportDefinition) => boolean) {
        return DefinitionUtils.getDefinitionFromListByFunc(this.reExports, searchFunction);
    }

    getExports(): ExportableDefinitions[] {
        const exports = ModuledDefinition.prototype.getExports.call(this) as ExportableDefinitions[];
        this.reExports.forEach(reExport => {
            reExport.getExports().forEach(def => {
                if (exports.indexOf(def) === -1) {
                    exports.push(def);
                }
            });
        });
        return exports;
    }

    write(writeOptions?: WriteOptions) {
        const writer = MainFactory.createWriter(writeOptions);
        const fileWriter = MainFactory.createWriteFactory(writer).getFileWriter();
        fileWriter.write(this, WriteFlags.Default);
        return writer.toString();
    }

    writeExportsAsDefinitionFile(options: { imports: ImportStructure[]; writeOptions?: WriteOptions; }) {
        console.warn("writeExportsAsDefinitionFile(...) is not supported. It has not been tested.");

        const writer = MainFactory.createWriter(options.writeOptions);

        if (options && options.imports) {
            const structureFactory = new StructureFactory();
            const importWriter = MainFactory.createWriteFactory(writer).getImportWriter();
            options.imports.forEach(importStructure => {
                const importDef = structureFactory.getImport(importStructure);
                importWriter.write(importDef);
            });

            writer.newLine();
        }

        const writeFlags = WriteFlags.HideFunctionBodies | WriteFlags.HideExpressions | WriteFlags.HidePrivateMembers | WriteFlags.HideProtectedMembers |
            WriteFlags.HideFunctionImplementations;

        this.getExports().forEach((exportDef) => {
            writeDefinition(exportDef, writer, writeFlags);
            writer.newLine();
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
    addClass: (structure: ClassStructure) => ClassDefinition;
    addEnum: (structure: EnumStructure) => EnumDefinition;
    addFunction: (structure: FunctionStructure) => FunctionDefinition;
    addInterface: (structure: InterfaceStructure) => InterfaceDefinition;
    addNamespace: (structure: NamespaceStructure) => NamespaceDefinition;
    addTypeAlias: (structure: TypeAliasStructure) => TypeAliasDefinition;
    addVariable: (structure: VariableStructure) => VariableDefinition;
    getClass: (nameOrSearchFunction: string | ((classDef: ClassDefinition) => boolean)) => (ClassDefinition | null);
    getEnum: (nameOrSearchFunction: string | ((enumDef: EnumDefinition) => boolean)) => (EnumDefinition | null);
    getFunction: (nameOrSearchFunction: string | ((functionDef: FunctionDefinition) => boolean)) => (FunctionDefinition | null);
    getInterface: (nameOrSearchFunction: string | ((interfaceDef: InterfaceDefinition) => boolean)) => (InterfaceDefinition | null);
    getNamespace: (nameOrSearchFunction: string | ((namespaceDef: NamespaceDefinition) => boolean)) => (NamespaceDefinition | null);
    getTypeAlias: (nameOrSearchFunction: string | ((typeAliasDef: TypeAliasDefinition) => boolean)) => (TypeAliasDefinition | null);
    getVariable: (nameOrSearchFunction: string | ((variableDef: VariableDefinition) => boolean)) => (VariableDefinition | null);
    directlyContains: (def: ModuleMemberDefinitions) => boolean;
    getNamespacesToDefinition: (searchDef: ModuleMemberDefinitions) => (NamespaceDefinition[] | null);
    getMembers: () => ModuleMemberDefinitions[];
    setOrderOfMember: (order: number, member: ModuleMemberDefinitions) => this;
    // NodedDefinition
    tsNode?: typeConstants.TypeScriptSourceFileNode;
}

applyMixins(FileDefinition, BaseDefinition, [ModuledDefinition, NodedDefinition]);
