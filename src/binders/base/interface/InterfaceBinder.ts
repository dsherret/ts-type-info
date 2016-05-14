import * as definitions from "./../../../definitions";
import {BaseDefinitionBinder, NamedBinder, ExportableBinder, AmbientableBinder, TypeParameteredBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export class InterfaceMemberContainer {
    callSignatures: definitions.CallSignatureDefinition[] = [];
    indexSignatures: definitions.IndexSignatureDefinition[] = [];
    methods: definitions.InterfaceMethodDefinition[] = [];
    newSignatures: definitions.CallSignatureDefinition[] = [];
    properties: definitions.InterfacePropertyDefinition[] = [];
}

export abstract class InterfaceBinder implements IBaseBinder {
    constructor(
        private baseDefinitionBinder: BaseDefinitionBinder,
        private namedBinder: NamedBinder,
        private exportableBinder: ExportableBinder,
        private ambientableBinder: AmbientableBinder,
        private typeParameteredBinder: TypeParameteredBinder
    ) {
    }

    abstract getMembers(): InterfaceMemberContainer;
    abstract getExtendsTypeExpressions(): definitions.TypeExpressionDefinition[];

    bind(def: definitions.InterfaceDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.namedBinder.bind(def);
        this.exportableBinder.bind(def);
        this.ambientableBinder.bind(def);
        this.typeParameteredBinder.bind(def);
        this.bindMembers(def);
        def.extendsTypeExpressions.push(...this.getExtendsTypeExpressions());
    }

    private bindMembers(def: definitions.InterfaceDefinition) {
        const memberContainer = this.getMembers();
        def.properties.push(...memberContainer.properties);
        def.methods.push(...memberContainer.methods);
        def.newSignatures.push(...memberContainer.newSignatures);
        def.callSignatures.push(...memberContainer.callSignatures);
        def.indexSignatures.push(...memberContainer.indexSignatures);
    }
}
