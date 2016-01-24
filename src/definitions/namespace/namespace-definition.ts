import * as ts from "typescript";
import {IModuledDefinition, ModuledDefinition, INamedDefinition, NamedDefinition, IExportableDefinition, ExportableDefinition,
    IAmbientableDefinition, AmbientableDefinition} from "./../base";
import {ClassDefinition} from "./../class";
import {InterfaceDefinition} from "./../interface";
import {EnumDefinition} from "./../enum";
import {FunctionDefinition} from "./../function";
import {VariableDefinition} from "./../variable";
import {applyMixins, DefinitionCache, TypeChecker} from "./../../utils";
import {NamespaceDeclarationType} from "./namespace-declaration-type";

export class NamespaceDefinition implements INamedDefinition, IExportableDefinition, IModuledDefinition, IAmbientableDefinition {
    declarationType: NamespaceDeclarationType;

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillName(symbol);
        this.fillExportable(typeChecker, symbol);
        this.fillAmbientable(typeChecker, symbol);
        this.fillDeclarationType(typeChecker, symbol);
    }

    private fillDeclarationType(typeChecker: TypeChecker, symbol: ts.Symbol) {
        const nodeFlags = typeChecker.getDeclarationFromSymbol(symbol).flags;

        if (nodeFlags & ts.NodeFlags.Namespace) {
            this.declarationType = NamespaceDeclarationType.Namespace;
        }
        else {
            this.declarationType = NamespaceDeclarationType.Module;
        }
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
    fillExportable: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    isExported: boolean;
    hasExportKeyword: boolean;
    // AmbientableDefinition
    fillAmbientable: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
}

applyMixins(NamespaceDefinition, [NamedDefinition, ExportableDefinition, ModuledDefinition, AmbientableDefinition]);
