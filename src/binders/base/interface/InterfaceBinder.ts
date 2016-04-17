import {InterfaceDefinition, InterfacePropertyDefinition, InterfaceMethodDefinition, CallSignatureDefinition, InterfaceNewSignatureDefinition,
    TypeExpressionDefinition} from "./../../../definitions";
import {NamedBinder, ExportableBinder, AmbientableBinder, TypeParameteredBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export class InterfaceMemberContainer {
    callSignatures: CallSignatureDefinition[] = [];
    methods: InterfaceMethodDefinition[] = [];
    newSignatures: InterfaceNewSignatureDefinition[] = [];
    properties: InterfacePropertyDefinition[] = [];
}

export abstract class InterfaceBinder implements IBaseBinder {
    constructor(
        private namedBinder: NamedBinder,
        private exportableBinder: ExportableBinder,
        private ambientableBinder: AmbientableBinder,
        private typeParameteredBinder: TypeParameteredBinder
    ) {
    }

    abstract getMembers(): InterfaceMemberContainer;

    abstract getExtendsTypeExpressions(): TypeExpressionDefinition[];

    bind(def: InterfaceDefinition) {
        this.namedBinder.bind(def);
        this.exportableBinder.bind(def);
        this.ambientableBinder.bind(def);
        this.typeParameteredBinder.bind(def);
        this.bindMembers(def);
        def.extendsTypeExpressions.push(...this.getExtendsTypeExpressions());
    }

    private bindMembers(def: InterfaceDefinition) {
        const memberContainer = this.getMembers();
        def.properties.push(...memberContainer.properties);
        def.methods.push(...memberContainer.methods);
        def.newSignatures.push(...memberContainer.newSignatures);
        def.callSignatures.push(...memberContainer.callSignatures);
    }
}
