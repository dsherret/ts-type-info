import {ExportableDefinitions} from "./../../definitions";
import {EnumDefinition} from "./../enum";
import {ClassDefinition} from "./../class";
import {FunctionDefinition} from "./../function";
import {InterfaceDefinition} from "./../interface";
import {NamespaceDefinition} from "./../namespace";
import {VariableDefinition} from "./../variable";
import {TypeAliasDefinition} from "./../general";

export abstract class ModuledDefinition {
    namespaces: NamespaceDefinition[] = [];
    classes: ClassDefinition[] = [];
    interfaces: InterfaceDefinition[] = [];
    enums: EnumDefinition[] = [];
    functions: FunctionDefinition[] = [];
    variables: VariableDefinition[] = [];
    typeAliases: TypeAliasDefinition[] = [];

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
