import CodeBlockWriter from "code-block-writer";
import {ModuledDefinitions} from "./../../definitions";
import {TypeExpression} from "./../../expressions";
import {InterfaceWriter} from "./../../writers";
import {WriteFlags} from "./../../write-flags";
import {applyMixins, tryGet, Logger, ArrayExt} from "./../../utils";
import {MainFactory} from "./../../factories";
import {ISymbolNode, ISignature} from "./../../wrappers";
import {AmbientableStructure, TypeParameteredStructure, NamedStructure, ExportableStructure} from "./../../structures";
import {INamedDefinition, NamedDefinition, IParentedDefinition, IExportableDefinition, ExportableDefinition, IAmbientableDefinition, AmbientableDefinition,
        ITypeParameteredDefinition, TypeParameteredDefinition, BaseDefinition, DefinitionType} from "./../base";
import {TypeParameterDefinition} from "./../general";
import {InterfaceMethodDefinition} from "./interface-method-definition";
import {InterfacePropertyDefinition} from "./interface-property-definition";
import {InterfaceNewSignatureDefinition} from "./interface-new-signature-definition";

type InterfaceMemberDefinitions = InterfaceMethodDefinition | InterfacePropertyDefinition | InterfaceNewSignatureDefinition;

export class InterfaceDefinition extends BaseDefinition
                                 implements INamedDefinition, IParentedDefinition<ModuledDefinitions>, IExportableDefinition, ITypeParameteredDefinition, IAmbientableDefinition {
    methods = new ArrayExt<InterfaceMethodDefinition>();
    newSignatures = new ArrayExt<InterfaceNewSignatureDefinition>();
    properties = new ArrayExt<InterfacePropertyDefinition>();
    typeParameters = new ArrayExt<TypeParameterDefinition<this>>();
    extendsTypeExpressions = new ArrayExt<TypeExpression>();

    constructor(mainFactory: MainFactory, symbolNode: ISymbolNode) {
        super(DefinitionType.Interface);
        this.fillName(symbolNode);
        this.fillExportable(symbolNode);
        this.fillMembers(mainFactory, symbolNode);
        this.fillAmbientable(symbolNode);
        this.fillTypeParametersBySymbol(mainFactory, symbolNode);
        this.extendsTypeExpressions.push(...symbolNode.getExtendsTypeExpressions().map(typeExpression => mainFactory.getTypeExpression(typeExpression)));
    }

    write() {
        const writer = new CodeBlockWriter();
        const interfaceWriter = new InterfaceWriter(writer, WriteFlags.Default);
        interfaceWriter.write(this);
        return writer.toString();
    }

    private fillMembers(mainFactory: MainFactory, symbolNode: ISymbolNode) {
        symbolNode.forEachChild(childSymbol => {
            const def = this.getMemberDefinition(mainFactory, childSymbol);

            if (def != null) {
                this.addDefinition(def);
            }
        });
    }

    private getMemberDefinition(mainFactory: MainFactory, childSymbol: ISymbolNode): InterfaceMemberDefinitions {
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
    fillName: (symbolNode: ISymbolNode) => void;
    // IParentedDefinition
    parent: ModuledDefinitions;
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    fillExportable: (symbolNode: ISymbolNode) => void;
    // TypeParameteredDefinition
    fillTypeParametersBySymbol: (mainFactory: MainFactory, symbolNode: ISymbolNode) => void;
    fillTypeParametersBySignature: (mainFactory: MainFactory, signature: ISignature) => void;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    fillAmbientable: (symbolNode: ISymbolNode) => void;
}

applyMixins(InterfaceDefinition, [NamedDefinition, ExportableDefinition, TypeParameteredDefinition, AmbientableDefinition]);
