import CodeBlockWriter from "code-block-writer";
import {applyMixins} from "./../../utils";
import {ExportableDefinitions} from "./../../definitions";
import {ClassStructure, EnumStructure, FunctionStructure, InterfaceStructure, TypeAliasStructure, VariableStructure} from "./../../structures";
import {FileWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
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
    defaultExport: { expression: ExpressionDefinition; definitions: ExportableDefinitions[]; };

    constructor() {
        super(DefinitionType.File);
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
    addTypeAliases: (...typeAliases: TypeAliasStructure[]) => this;
    addVariables: (...variables: VariableStructure[]) => this;
}

applyMixins(FileDefinition, BaseDefinition, [ModuledDefinition]);
