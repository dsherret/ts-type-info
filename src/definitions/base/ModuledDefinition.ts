import {TsNode} from "./../../compiler"
import {tryGet, Logger, ArrayExt} from "./../../utils";
import {ExportableDefinitions, NodeDefinitions} from "./../../definitions";
import {ParentedDefinition} from "./../base";
import {EnumDefinition} from "./../enum";
import {ClassDefinition} from "./../class";
import {FunctionDefinition} from "./../function";
import {InterfaceDefinition} from "./../interface";
import {NamespaceDefinition} from "./../namespace";
import {VariableDefinition} from "./../variable";
import {TypeAliasDefinition} from "./../general";

export abstract class ModuledDefinition {
    namespaces = new ArrayExt<NamespaceDefinition>();
    classes = new ArrayExt<ClassDefinition>();
    interfaces = new ArrayExt<InterfaceDefinition>();
    enums = new ArrayExt<EnumDefinition>();
    functions = new ArrayExt<FunctionDefinition>();
    variables = new ArrayExt<VariableDefinition>();
    typeAliases = new ArrayExt<TypeAliasDefinition>();

    getExports() {
        const exports: ExportableDefinitions[] = [];
        const addExportedToExports = (e: ExportableDefinitions) => {
            if (e.isExported && !e.isDefaultExportOfFile) {
                exports.push(e);
            }
        };

        this.namespaces.forEach(addExportedToExports);
        this.classes.forEach(addExportedToExports);
        this.interfaces.forEach(addExportedToExports);
        this.enums.forEach(addExportedToExports);
        this.functions.forEach(addExportedToExports);
        this.variables.forEach(addExportedToExports);
        this.typeAliases.forEach(addExportedToExports);

        return exports;
    }
}
