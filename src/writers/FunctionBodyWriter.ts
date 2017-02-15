﻿import CodeBlockWriter from "code-block-writer";
import {FunctionBodyWriteableDefinitions, FunctionDefinition, ClassMethodDefinition, ClassStaticMethodDefinition, ClassConstructorDefinition,
    InterfaceMethodDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";

type NotInterfaceMethod = FunctionDefinition | ClassMethodDefinition | ClassStaticMethodDefinition | ClassConstructorDefinition;

export class FunctionBodyWriter {
    constructor(private readonly writer: CodeBlockWriter) {
    }

    willWriteFunctionBody(def: FunctionBodyWriteableDefinitions, flags: WriteFlags): def is NotInterfaceMethod {
        if (def instanceof InterfaceMethodDefinition)
            return false;
        else {
            const isOnWriteFunctionBodyDefined = typeof def.onWriteFunctionBody === "function";
            const shouldHideFunctionBodies = (flags & WriteFlags.HideFunctionBodies) !== 0;
            const isAmbient = (def as any as FunctionDefinition).isAmbient || false;
            const isAbstract = (def as any as ClassMethodDefinition).isAbstract || false;
            const suggestedToHideFunctionBody = shouldHideFunctionBodies || isAmbient || isAbstract;

            return isOnWriteFunctionBodyDefined || !suggestedToHideFunctionBody;
        }
    }

    write(def: FunctionBodyWriteableDefinitions, flags: WriteFlags) {
        if (this.willWriteFunctionBody(def, flags))
            this.writeFunctionBody(def);
        else
            this.writeSemiColon();
    }

    private writeSemiColon() {
        this.writer.write(";");
    }

    private writeFunctionBody(def: NotInterfaceMethod) {
        this.writer.block(() => {
            if (typeof def.onWriteFunctionBody === "function")
                def.onWriteFunctionBody(this.writer);
        });
    }
}
