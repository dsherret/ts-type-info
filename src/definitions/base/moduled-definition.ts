import {ISymbolNode} from "./../../wrappers";
import {tryGet, Logger, ArrayExt} from "./../../utils";
import {IDefinitionFactory} from "./../../factories";
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
    namespaces: ArrayExt<NamespaceDefinition>;
    classes: ArrayExt<ClassDefinition>;
    interfaces: ArrayExt<InterfaceDefinition>;
    enums: ArrayExt<EnumDefinition>;
    functions: ArrayExt<FunctionDefinition>;
    variables: ArrayExt<VariableDefinition>;
    typeAliases: ArrayExt<TypeAliasDefinition>;
    exports: ArrayExt<ExportableDefinitions>;
    fillMembersBySymbolNode(definitionFactory: IDefinitionFactory, symbolNode: ISymbolNode): void;
}

export abstract class ModuledDefinition implements IModuledDefinition {
    namespaces: ArrayExt<NamespaceDefinition>;
    classes: ArrayExt<ClassDefinition>;
    interfaces: ArrayExt<InterfaceDefinition>;
    enums: ArrayExt<EnumDefinition>;
    functions: ArrayExt<FunctionDefinition>;
    variables: ArrayExt<VariableDefinition>;
    typeAliases: ArrayExt<TypeAliasDefinition>;
    exports: ArrayExt<ExportableDefinitions>;

    fillMembersBySymbolNode(definitionFactory: IDefinitionFactory, fileSymbolNode: ISymbolNode) {
        this.initializeMD();

        fileSymbolNode.forEachChild((symbolNode) => {
            const def = tryGet(symbolNode, () => definitionFactory.getDefinitionBySymbolNode(symbolNode));

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
        this.namespaces = new ArrayExt<NamespaceDefinition>();
        this.classes = new ArrayExt<ClassDefinition>();
        this.interfaces = new ArrayExt<InterfaceDefinition>();
        this.enums = new ArrayExt<EnumDefinition>();
        this.functions = new ArrayExt<FunctionDefinition>();
        this.variables = new ArrayExt<VariableDefinition>();
        this.typeAliases = new ArrayExt<TypeAliasDefinition>();
        this.exports = new ArrayExt<ExportableDefinitions>();
    }
}
