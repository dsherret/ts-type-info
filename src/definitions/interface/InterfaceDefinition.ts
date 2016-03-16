﻿import CodeBlockWriter from "code-block-writer";
import {ModuledDefinitions} from "./../../definitions";
import {TypeExpression} from "./../../expressions";
import {InterfaceWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import {applyMixins, tryGet, Logger, ArrayExt} from "./../../utils";
import {NamedDefinition, ParentedDefinition, ExportableDefinition, AmbientableDefinition,
        TypeParameteredDefinition, BaseDefinition, DefinitionType} from "./../base";
import {TypeParameterDefinition} from "./../general";
import {InterfaceMethodDefinition} from "./InterfaceMethodDefinition";
import {InterfacePropertyDefinition} from "./InterfacePropertyDefinition";
import {InterfaceNewSignatureDefinition} from "./InterfaceNewSignatureDefinition";

export class InterfaceDefinition extends BaseDefinition
                                 implements NamedDefinition, ParentedDefinition<ModuledDefinitions>, ExportableDefinition, TypeParameteredDefinition, AmbientableDefinition {
    methods = new ArrayExt<InterfaceMethodDefinition>();
    newSignatures = new ArrayExt<InterfaceNewSignatureDefinition>();
    properties = new ArrayExt<InterfacePropertyDefinition>();
    extendsTypeExpressions = new ArrayExt<TypeExpression>();

    constructor() {
        super(DefinitionType.Interface);
    }

    write() {
        const writer = new CodeBlockWriter();
        const interfaceWriter = new InterfaceWriter(writer, WriteFlags.Default);
        interfaceWriter.write(this);
        return writer.toString();
    }

    // NamedDefinition
    name: string;
    // IParentedDefinition
    parent: ModuledDefinitions;
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    // TypeParameteredDefinition
    typeParameters = new ArrayExt<TypeParameterDefinition<this>>();
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
}

applyMixins(InterfaceDefinition, [NamedDefinition, ExportableDefinition, TypeParameteredDefinition, AmbientableDefinition]);
