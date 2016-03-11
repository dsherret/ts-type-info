import CodeBlockWriter from "code-block-writer";
import {ModuledDefinitions} from "./../../definitions";
import {TypeExpression} from "./../../expressions";
import {InterfaceWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import {applyMixins, tryGet, Logger, ArrayExt} from "./../../utils";
import {MainFactory} from "./../../factories";
import {INode, ISignature} from "./../../wrappers";
import {INamedDefinition, NamedDefinition, IParentedDefinition, IExportableDefinition, ExportableDefinition, IAmbientableDefinition, AmbientableDefinition,
        ITypeParameteredDefinition, TypeParameteredDefinition, BaseDefinition, DefinitionType} from "./../base";
import {TypeParameterDefinition} from "./../general";
import {InterfaceMethodDefinition} from "./InterfaceMethodDefinition";
import {InterfacePropertyDefinition} from "./InterfacePropertyDefinition";
import {InterfaceNewSignatureDefinition} from "./InterfaceNewSignatureDefinition";

type InterfaceMemberDefinitions = InterfaceMethodDefinition | InterfacePropertyDefinition | InterfaceNewSignatureDefinition;

export class InterfaceDefinition extends BaseDefinition
                                 implements INamedDefinition, IParentedDefinition<ModuledDefinitions>, IExportableDefinition, ITypeParameteredDefinition, IAmbientableDefinition {
    methods = new ArrayExt<InterfaceMethodDefinition>();
    newSignatures = new ArrayExt<InterfaceNewSignatureDefinition>();
    properties = new ArrayExt<InterfacePropertyDefinition>();
    typeParameters = new ArrayExt<TypeParameterDefinition<this>>();
    extendsTypeExpressions = new ArrayExt<TypeExpression>();

    constructor(mainFactory: MainFactory, node: INode) {
        super(DefinitionType.Interface);
        this.fillName(node);
        this.fillExportable(node);
        this.fillMembers(mainFactory, node);
        this.fillAmbientable(node);
        this.fillTypeParametersBySymbol(mainFactory, node);
        this.extendsTypeExpressions.push(...node.getSymbol().getExtendsTypeExpressions().map(typeExpression => mainFactory.getTypeExpression(typeExpression)));
    }

    write() {
        const writer = new CodeBlockWriter();
        const interfaceWriter = new InterfaceWriter(writer, WriteFlags.Default);
        interfaceWriter.write(this);
        return writer.toString();
    }

    private fillMembers(mainFactory: MainFactory, node: INode) {
        node.forEachChild(childSymbol => {
            const def = this.getMemberDefinition(mainFactory, childSymbol);

            if (def != null) {
                this.addDefinition(def);
            }
        });
    }

    private getMemberDefinition(mainFactory: MainFactory, childSymbol: INode): InterfaceMemberDefinitions {
        return tryGet(childSymbol, () => {
            if (childSymbol.isMethodSignature()) {
                return new InterfaceMethodDefinition(mainFactory, childSymbol, this);
            }
            else if (childSymbol.isPropertySignature()) {
                return new InterfacePropertyDefinition(mainFactory, childSymbol, this);
            }
            else if (childSymbol.isConstructSignature()) {
                return new InterfaceNewSignatureDefinition(mainFactory, childSymbol.getSignatureFromThis(), this);
            }
            else if (childSymbol.isIdentifier()) {
                // ignore, it's the interface identifier
            }
            else if (childSymbol.isTypeParameter()) {
                // ignore, handled elsewhere
            }
            else if (childSymbol.isExportKeyword()) {
                // ignore, handled elsewhere
            }
            else if (childSymbol.isDefaultKeyword()) {
                // ignore, handled elsewhere
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
    fillName: (node: INode) => void;
    // IParentedDefinition
    parent: ModuledDefinitions;
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    fillExportable: (node: INode) => void;
    // TypeParameteredDefinition
    fillTypeParametersBySymbol: (mainFactory: MainFactory, node: INode) => void;
    fillTypeParametersBySignature: (mainFactory: MainFactory, signature: ISignature) => void;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    fillAmbientable: (node: INode) => void;
}

applyMixins(InterfaceDefinition, [NamedDefinition, ExportableDefinition, TypeParameteredDefinition, AmbientableDefinition]);
