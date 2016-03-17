import CodeBlockWriter from "code-block-writer";
import {applyMixins, ArrayExt, Logger} from "./../../utils";
import {ExportableDefinitions, NodeDefinitions} from "./../../definitions";
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
    imports = new ArrayExt<ImportDefinition>();
    reExports = new ArrayExt<ReExportDefinition>();
    defaultExport: { expression: ExpressionDefinition; definitions: ArrayExt<ExportableDefinitions>; };

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
        const fileWriter = new FileWriter(writer, WriteFlags.Default);
        fileWriter.write(this);
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
    namespaces: ArrayExt<NamespaceDefinition>;
    classes: ArrayExt<ClassDefinition>;
    interfaces: ArrayExt<InterfaceDefinition>;
    enums: ArrayExt<EnumDefinition>;
    functions: ArrayExt<FunctionDefinition>;
    variables: ArrayExt<VariableDefinition>;
    typeAliases: ArrayExt<TypeAliasDefinition>;
}

applyMixins(FileDefinition, BaseDefinition, [ModuledDefinition]);
