import {WrappedSymbolNode} from "./../../wrappers";
import {DefinitionCache, tryGet, Logger, ExtendedArray} from "./../../utils";
import {IParentedDefinition} from "./../base";
import {EnumDefinition} from "./../enum";
import {ClassDefinition} from "./../class";
import {FunctionDefinition} from "./../function";
import {InterfaceDefinition} from "./../interface";
import {NamespaceDefinition} from "./../namespace";
import {VariableDefinition} from "./../variable";
import {TypeAliasDefinition} from "./../general";
import {ExportableDefinitions} from "./../../definitions";

export interface IModuledDefinition {
    namespaces: ExtendedArray<NamespaceDefinition>;
    classes: ExtendedArray<ClassDefinition>;
    interfaces: ExtendedArray<InterfaceDefinition>;
    enums: ExtendedArray<EnumDefinition>;
    functions: ExtendedArray<FunctionDefinition>;
    variables: ExtendedArray<VariableDefinition>;
    typeAliases: ExtendedArray<TypeAliasDefinition>;
    exports: ExtendedArray<ExportableDefinitions>;
    fillMembersByNode(definitionCache: DefinitionCache, symbolNode: WrappedSymbolNode): void;
}

export abstract class ModuledDefinition implements IModuledDefinition {
    namespaces: ExtendedArray<NamespaceDefinition>;
    classes: ExtendedArray<ClassDefinition>;
    interfaces: ExtendedArray<InterfaceDefinition>;
    enums: ExtendedArray<EnumDefinition>;
    functions: ExtendedArray<FunctionDefinition>;
    variables: ExtendedArray<VariableDefinition>;
    typeAliases: ExtendedArray<TypeAliasDefinition>;
    exports: ExtendedArray<ExportableDefinitions>;

    fillMembersByNode(definitionCache: DefinitionCache, fileSymbolNode: WrappedSymbolNode) {
        this.initializeMD();

        fileSymbolNode.forEachChild((symbolNode) => {
            const def = tryGet(symbolNode, () => definitionCache.getDefinition(symbolNode));

            if (def != null) {
                if (def.isFunctionDefinition()) {
                    this.functions.push(def);
                }
                else if (def.isClassDefinition()) {
                    this.classes.push(def);
                }
                else if (def.isInterfaceDefinition()) {
                    this.interfaces.push(def);
                }
                else if (def.isEnumDefinition()) {
                    this.enums.push(def);
                }
                else if (def.isVariableDefinition()) {
                    this.variables.push(def);
                }
                else if (def.isTypeAliasDefinition()) {
                    this.typeAliases.push(def);
                }
                else if (def.isNamespaceDefinition()) {
                    this.namespaces.push(def);
                }
                else {
                    Logger.warn(`Not implemented: ${symbolNode.getName()}`);
                }

                this.checkAddToExports(def);
            }
            else {
                const isKnownTypeToIgnore = symbolNode.isDefaultExport() || symbolNode.isExportDeclaration() || symbolNode.isExportAssignment();

                if (!isKnownTypeToIgnore) {
                    Logger.warn(`Symbol definition is null for: ${symbolNode.getName()}`);
                }
            }
        });

        this.fillModuledChildrenWithParent();
    }

    private checkAddToExports(def: ExportableDefinitions) {
        if (def.isExported && !def.isDefaultExportOfFile) {
            this.exports.push(def);
        }
    }

    private fillModuledChildrenWithParent() {
        const fillWithParent = (f: IParentedDefinition<any>) => f.parent = this;
        this.namespaces.forEach(fillWithParent);
        this.classes.forEach(fillWithParent);
        this.enums.forEach(fillWithParent);
        this.functions.forEach(fillWithParent);
        this.interfaces.forEach(fillWithParent);
        this.variables.forEach(fillWithParent);
        this.typeAliases.forEach(fillWithParent);
    }

    private initializeMD() {
        this.namespaces = new ExtendedArray<NamespaceDefinition>();
        this.classes = new ExtendedArray<ClassDefinition>();
        this.interfaces = new ExtendedArray<InterfaceDefinition>();
        this.enums = new ExtendedArray<EnumDefinition>();
        this.functions = new ExtendedArray<FunctionDefinition>();
        this.variables = new ExtendedArray<VariableDefinition>();
        this.typeAliases = new ExtendedArray<TypeAliasDefinition>();
        this.exports = new ExtendedArray<ExportableDefinitions>();
    }
}
