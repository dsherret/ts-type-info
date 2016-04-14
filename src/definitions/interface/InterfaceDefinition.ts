import CodeBlockWriter from "code-block-writer";
import {StructureFactory} from "./../../factories";
import {TypeParameterStructure, InterfaceMethodStructure, InterfaceNewSignatureStructure, InterfacePropertyStructure} from "./../../structures";
import {InterfaceWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import {applyMixins, DefinitionUtils} from "./../../utils";
import {NamedDefinition, ExportableDefinition, AmbientableDefinition, TypeParameteredDefinition, BaseDefinition, DefinitionType} from "./../base";
import {TypeParameterDefinition} from "./../general";
import {TypeExpressionDefinition} from "./../expressions";
import {InterfaceMethodDefinition} from "./InterfaceMethodDefinition";
import {InterfacePropertyDefinition} from "./InterfacePropertyDefinition";
import {InterfaceNewSignatureDefinition} from "./InterfaceNewSignatureDefinition";

export class InterfaceDefinition extends BaseDefinition
                                 implements NamedDefinition, ExportableDefinition, TypeParameteredDefinition, AmbientableDefinition {
    methods: InterfaceMethodDefinition[] = [];
    newSignatures: InterfaceNewSignatureDefinition[] = [];
    properties: InterfacePropertyDefinition[] = [];
    extendsTypeExpressions: TypeExpressionDefinition[] = [];

    constructor() {
        super(DefinitionType.Interface);
    }

    addExtends(...texts: string[]) {
        const factory = new StructureFactory();
        this.extendsTypeExpressions.push(...texts.map(t => factory.getTypeExpressionFromText(t)));
        return this;
    }

    addMethods(...methods: InterfaceMethodStructure[]) {
        const factory = new StructureFactory();
        this.methods.push(...methods.map(m => factory.getInterfaceMethod(m)));
        return this;
    }

    addNewSignatures(...newSignatures: InterfaceNewSignatureStructure[]) {
        const factory = new StructureFactory();
        this.newSignatures.push(...newSignatures.map(n => factory.getInterfaceNewSignature(n)));
        return this;
    }

    addProperties(...properties: InterfacePropertyStructure[]) {
        const factory = new StructureFactory();
        this.properties.push(...properties.map(p => factory.getInterfaceProperty(p)));
        return this;
    }

    getMethod(nameOrSearchFunction: string | ((method: InterfaceMethodDefinition) => boolean)) {
        return DefinitionUtils.getDefinitionFromListByStrOrFunc(this.methods, nameOrSearchFunction);
    }

    getNewSignature(searchFunction: (newSignature: InterfaceNewSignatureDefinition) => boolean) {
        return DefinitionUtils.getDefinitionFromListByFunc(this.newSignatures, searchFunction);
    }

    getProperty(nameOrSearchFunction: string | ((property: InterfacePropertyDefinition) => boolean)) {
        return DefinitionUtils.getDefinitionFromListByStrOrFunc(this.properties, nameOrSearchFunction);
    }

    write() {
        const writer = new CodeBlockWriter();
        const interfaceWriter = new InterfaceWriter(writer);
        interfaceWriter.write(this, WriteFlags.Default);
        return writer.toString();
    }

    // NamedDefinition
    name: string;
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    // TypeParameteredDefinition
    typeParameters: TypeParameterDefinition[];
    addTypeParameters: (...typeParameters: TypeParameterStructure[]) => this;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
}

applyMixins(InterfaceDefinition, BaseDefinition, [NamedDefinition, ExportableDefinition, TypeParameteredDefinition, AmbientableDefinition]);
