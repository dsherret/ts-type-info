import * as ts from "typescript";
import {IModuledDefinition, ModuledDefinition, INamedDefinition, IBaseNamedDefinition, NamedDefinition, IExportableDefinition, ExportableDefinition,
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
    name: string;
    fillName: (symbol: ts.Symbol) => void;
    // ModuledDefinition
    namespaces: NamespaceDefinition[];
    classes: ClassDefinition[];
    interfaces: InterfaceDefinition[];
    enums: EnumDefinition[];
    functions: FunctionDefinition[];
    variables: VariableDefinition[];
    exports: (IBaseNamedDefinition & IExportableDefinition)[];
    fillMembersBySourceFile: (typeChecker: TypeChecker, definitionCache: DefinitionCache, node: ts.SourceFile) => void;
    fillMembersBySymbol: (typeChecker: TypeChecker, definitionCache: DefinitionCache, symbol: ts.Symbol) => void;
    // ExportableDefinition
    isExported: boolean;
    hasExportKeyword: boolean;
    fillExportable: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    fillAmbientable: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
}

applyMixins(NamespaceDefinition, [NamedDefinition, ExportableDefinition, ModuledDefinition, AmbientableDefinition]);
