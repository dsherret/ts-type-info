import {InterfaceDefinition, InterfaceMemberDefinitions, TypeExpressionDefinition} from "./../../../definitions";
import {Logger} from "./../../../utils";
import {NamedBinder, ExportableBinder, AmbientableBinder, TypeParameteredBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class InterfaceBinder implements IBaseBinder {
    constructor(
        private namedBinder: NamedBinder,
        private exportableBinder: ExportableBinder,
        private ambientableBinder: AmbientableBinder,
        private typeParameteredBinder: TypeParameteredBinder
    ) {
    }

    abstract getMembers(): InterfaceMemberDefinitions[];
    abstract getExtendsTypeExpressions(): TypeExpressionDefinition[];

    bind(def: InterfaceDefinition) {
        this.namedBinder.bind(def);
        this.exportableBinder.bind(def);
        this.ambientableBinder.bind(def);
        this.typeParameteredBinder.bind(def);
        this.getMembers().forEach(memberDef => this.bindMember(def, memberDef));
        def.extendsTypeExpressions.push(...this.getExtendsTypeExpressions());
    }

    private bindMember(def: InterfaceDefinition, member: InterfaceMemberDefinitions) {
        if (member.isInterfacePropertyDefinition()) {
            def.properties.push(member);
        }
        else if (member.isInterfaceMethodDefinition()) {
            def.methods.push(member);
        }
        else if (member.isInterfaceNewSignatureDefinition()) {
            def.newSignatures.push(member);
        }
        else if (member.isCallSignatureDefinition()) {
            def.callSignatures.push(member);
        }
        else {
            Logger.warn(`Not implemented interface member.`);
            return;
        }
    }
}
