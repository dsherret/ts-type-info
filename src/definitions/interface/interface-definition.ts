import CodeBlockWriter from "code-block-writer";
import {ModuledDefinitions} from "./../../definitions";
import {TypeExpression} from "./../../expressions";
import {InterfaceWriter} from "./../../writers";
import {WriteFlags} from "./../../write-flags";
import {applyMixins, tryGet, Logger, ExtendedArray} from "./../../utils";
import {WrappedSymbolNode, WrappedSignature} from "./../../wrappers";
import {INamedDefinition, NamedDefinition, IParentedDefinition, IExportableDefinition, ExportableDefinition, IAmbientableDefinition, AmbientableDefinition,
        ITypeParameteredDefinition, TypeParameteredDefinition, BaseDefinition, DefinitionType} from "./../base";
import {TypeParameterDefinition} from "./../general";
import {InterfaceMethodDefinition} from "./interface-method-definition";
import {InterfacePropertyDefinition} from "./interface-property-definition";
import {InterfaceNewSignatureDefinition} from "./interface-new-signature-definition";

type InterfaceMemberDefinitions = InterfaceMethodDefinition | InterfacePropertyDefinition | InterfaceNewSignatureDefinition;

export class InterfaceDefinition extends BaseDefinition
                                 implements INamedDefinition, IParentedDefinition<ModuledDefinitions>, IExportableDefinition, ITypeParameteredDefinition, IAmbientableDefinition {
    methods = new ExtendedArray<InterfaceMethodDefinition>();
    newSignatures = new ExtendedArray<InterfaceNewSignatureDefinition>();
    properties = new ExtendedArray<InterfacePropertyDefinition>();
    typeParameters = new ExtendedArray<TypeParameterDefinition<this>>();
    extendsTypeExpressions = new ExtendedArray<TypeExpression>();

    constructor(symbolNode: WrappedSymbolNode) {
        super(DefinitionType.Interface);
        this.fillName(symbolNode);
        this.fillExportable(symbolNode);
        this.fillMembers(symbolNode);
        this.fillAmbientable(symbolNode);
        this.fillTypeParametersBySymbol(symbolNode);
        this.extendsTypeExpressions.push(...symbolNode.getExtendsTypeExpressions());
    }

    write() {
        const writer = new CodeBlockWriter();
        const interfaceWriter = new InterfaceWriter(writer, WriteFlags.Default);
        interfaceWriter.write(this);
        return writer.toString();
    }

    private fillMembers(symbolNode: WrappedSymbolNode) {
        symbolNode.forEachChild(childSymbol => {
            const def = this.getMemberDefinition(childSymbol);

            if (def != null) {
                this.addDefinition(def);
            }
        });
    }

    private getMemberDefinition(childSymbol: WrappedSymbolNode): InterfaceMemberDefinitions {
        return tryGet(childSymbol, () => {
            if (childSymbol.isMethodSignature()) {
                return new InterfaceMethodDefinition(childSymbol, this);
            }
            else if (childSymbol.isPropertySignature()) {
                return new InterfacePropertyDefinition(childSymbol, this);
            }
            else if (childSymbol.isConstructSignature()) {
                return new InterfaceNewSignatureDefinition(childSymbol.getSignatureFromThis(), this);
            }
            else if (childSymbol.isIdentifier()) {
                // ignore, it's the interface identifier
            }
            else if (childSymbol.isTypeParameter()) {
                // ignore, it's handled in TypeParameteredDefinition
            }
            else {
                Logger.warn(`Unknown interface child kind: ${childSymbol.nodeKindToString()}`);
            }
        });
    }

    private addDefinition(def: InterfaceMemberDefinitions) {
        if (def.isInterfacePropertyDefinition()) {
            this.properties.push(def);
        }
        else if (def.isInterfaceMethodDefinition()) {
            this.methods.push(def);
        }
        else if (def.isInterfaceNewSignatureDefinition()) {
            this.newSignatures.push(def);
        }
        else {
            Logger.warn(`Not implemented interface member.`);
        }
    }

    // NamedDefinition
    name: string;
    fillName: (symbolNode: WrappedSymbolNode) => void;
    // IParentedDefinition
    parent: ModuledDefinitions;
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    fillExportable: (symbolNode: WrappedSymbolNode) => void;
    // TypeParameteredDefinition
    fillTypeParametersBySymbol: (symbolNode: WrappedSymbolNode) => void;
    fillTypeParametersBySignature: (signature: WrappedSignature) => void;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    fillAmbientable: (symbolNode: WrappedSymbolNode) => void;
}

applyMixins(InterfaceDefinition, [NamedDefinition, ExportableDefinition, TypeParameteredDefinition, AmbientableDefinition]);
