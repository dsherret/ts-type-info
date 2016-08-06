﻿import {ClassConstructorDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {ParametersWriter} from "./ParametersWriter";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {FunctionBodyWriter} from "./FunctionBodyWriter";

export class ClassConstructorWriter extends BaseDefinitionWriter<ClassConstructorDefinition> {
    private readonly parametersWriter = new ParametersWriter(this.writer);
    private readonly functionBodyWriter = new FunctionBodyWriter(this.writer);

    static shouldWriteConstructor(def: ClassConstructorDefinition, flags: WriteFlags) {
        return (def.parameters.length > 0 || FunctionBodyWriter.willWriteFunctionBody(def, flags) || flags & WriteFlags.HideFunctionBodies);
    }

    protected writeDefault(def: ClassConstructorDefinition, flags: WriteFlags) {
        this.writer.write("constructor");
        this.parametersWriter.write(def, flags);
        this.functionBodyWriter.write(def, flags);
    }
}
