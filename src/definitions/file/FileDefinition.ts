import CodeBlockWriter from "code-block-writer";
import {ExportableDefinitions} from "./../../definitions";
import {StructureFactory} from "./../../factories";
import {ClassStructure, EnumStructure, FunctionStructure, ImportStructure, InterfaceStructure, NamespaceStructure, ReExportStructure, TypeAliasStructure,
    VariableStructure} from "./../../structures";
import {FileWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import {applyMixins, validateImportStructure} from "./../../utils";
import {writeDefinition} from "./../../writeDefinition";
import {ModuledDefinition, BaseDefinition, DefinitionType} from "./../base";
import {ExpressionDefinition} from "./../expressions";
import {NamespaceDefinition} from "./../namespace";
import {ClassDefinition} from "./../class";
import {InterfaceDefinition} from "./../interface";
import {EnumDefinition} from "./../enum";
import {FunctionDefinition} from "./../function";
import {VariableDefinition} from "./../variable";
import {TypeAliasDefinition} from "./../general";
import {ReExportDefinition} from "./ReExportDefinition";
import {ImportDefinition} from "./ImportDefinition";

export class FileDefinition extends BaseDefinition implements ModuledDefinition {
    fileName: string;
    imports: ImportDefinition[] = [];
    reExports: ReExportDefinition[] = [];
    defaultExportExpression: ExpressionDefinition;

    constructor() {
        super(DefinitionType.File);
    }

    addImports(...imports: ImportStructure[]) {
        const factory = new StructureFactory();
        this.imports.push(...imports.map(i => {
            validateImportStructure(i);
            return factory.getImport(i);
        }));
        return this;
    }

    addReExports(...reExports: ReExportStructure[]) {
        const factory = new StructureFactory();
        this.reExports.push(...reExports.map(r => factory.getReExport(r)));
        return this;
    }

    getExports(): ExportableDefinitions[] {
        const exports = ModuledDefinition.prototype.getExports.call(this) as ExportableDefinitions[];
        this.reExports.forEach(reExport => exports.push(...reExport.getExports()));
        return exports;
    }

    write() {
        const writer = new CodeBlockWriter();
        const fileWriter = new FileWriter(writer);
        fileWriter.write(this, WriteFlags.Default);
        return writer.toString();
    }

    writeExportsAsDefinitionFile(options: { imports: { defaultImport: string; moduleSpecifier: string }[]}) {
        console.warn("writeExportsAsDefinitionFile(...) is not supported. It has not been tested.");

        const writer = new CodeBlockWriter();

        if (options && options.imports) {
            // todo: should use an ImportWriter to write this
            options.imports.forEach(importStructure => {
                writer.writeLine(`import ${importStructure.defaultImport} from "${importStructure.moduleSpecifier}";`);
            });

            writer.newLine();
        }

        this.getExports().forEach((exportDef) => {
            writeDefinition(exportDef, writer, WriteFlags.HideFunctionBodies | WriteFlags.HideExpressions | WriteFlags.HidePrivateMembers | WriteFlags.HideProtectedMembers);
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
    addClasses: (...classes: ClassStructure[]) => this;
    addEnums: (...enums: EnumStructure[]) => this;
    addFunctions: (...functions: FunctionStructure[]) => this;
    addInterfaces: (...interfaces: InterfaceStructure[]) => this;
    addNamespaces: (...namespaces: NamespaceStructure[]) => this;
    addTypeAliases: (...typeAliases: TypeAliasStructure[]) => this;
    addVariables: (...variables: VariableStructure[]) => this;
    getClass: (nameOrSearchFunction: string | ((classDef: ClassDefinition) => boolean)) => ClassDefinition;
    getEnum: (nameOrSearchFunction: string | ((enumDef: EnumDefinition) => boolean)) => EnumDefinition;
    getFunction: (nameOrSearchFunction: string | ((functionDef: FunctionDefinition) => boolean)) => FunctionDefinition;
    getInterface: (nameOrSearchFunction: string | ((interfaceDef: InterfaceDefinition) => boolean)) => InterfaceDefinition;
    getNamespace: (nameOrSearchFunction: string | ((namespaceDef: NamespaceDefinition) => boolean)) => NamespaceDefinition;
    getTypeAlias: (nameOrSearchFunction: string | ((typeAliasDef: TypeAliasDefinition) => boolean)) => TypeAliasDefinition;
    getVariable: (nameOrSearchFunction: string | ((variableDef: VariableDefinition) => boolean)) => VariableDefinition;
}

applyMixins(FileDefinition, BaseDefinition, [ModuledDefinition]);
