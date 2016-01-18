import * as ts from "typescript";
import {IModuledDefinition, ModuledDefinition, INamedDefinition, NamedDefinition, IExportableDefinition, ExportableDefinition} from "./../base";
import {ClassDefinition} from "./../class";
import {InterfaceDefinition} from "./../interface";
import {EnumDefinition} from "./../enum";
import {FunctionDefinition} from "./../function";
import {VariableDefinition} from "./../general";
import {applyMixins, DefinitionCache, TypeChecker} from "./../../utils";

export class NamespaceDefinition implements INamedDefinition, IExportableDefinition, IModuledDefinition {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillName(symbol);
        this.fillIsExported(typeChecker, symbol);
    }

    // NamedDefinition
    fillName: (symbol: ts.Symbol) => void;
    name: string;
    // ModuledDefinition
    fillMembersBySourceFile: (typeChecker: TypeChecker, definitionCache: DefinitionCache, node: ts.SourceFile) => void;
    fillMembersBySymbol: (typeChecker: TypeChecker, definitionCache: DefinitionCache, symbol: ts.Symbol) => void;
    namespaces: NamespaceDefinition[];
    classes: ClassDefinition[];
    interfaces: InterfaceDefinition[];
    enums: EnumDefinition[];
    functions: FunctionDefinition[];
    variables: VariableDefinition[];
    // ExportableDefinition
    fillIsExported: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    isExported: boolean;
}

applyMixins(NamespaceDefinition, [NamedDefinition, ExportableDefinition, ModuledDefinition]);
