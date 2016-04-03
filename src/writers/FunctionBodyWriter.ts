import {FunctionBodyWriteableDefinitions, FunctionDefinition, ClassMethodDefinition, ClassStaticMethodDefinition, ClassConstructorDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {BaseWriter} from "./BaseWriter";

type NotInterfaceMethod = FunctionDefinition | ClassMethodDefinition | ClassStaticMethodDefinition | ClassConstructorDefinition;

export class FunctionBodyWriter extends BaseWriter {
    static willWriteFunctionBody(def: FunctionBodyWriteableDefinitions, flags: WriteFlags): def is NotInterfaceMethod {
        if (def.isInterfaceMethodDefinition()) {
            return false;
        }
        else {
            const isOnWriteFunctionBodyDefined = typeof def.onWriteFunctionBody === "function";
            const shouldHideFunctionBodies = (flags & WriteFlags.HideFunctionBodies) !== 0;
            const isAmbient = (def.isFunctionDefinition() && (def as any as FunctionDefinition).isAmbient);
            const isAbstract = (def as any as ClassMethodDefinition).isAbstract || false;
            const suggestedToHideFunctionBody = shouldHideFunctionBodies || isAmbient || isAbstract;

            return isOnWriteFunctionBodyDefined || !suggestedToHideFunctionBody;
        }
    }

    write(def: FunctionBodyWriteableDefinitions, flags: WriteFlags) {
        if (FunctionBodyWriter.willWriteFunctionBody(def, flags)) {
            this.writeFunctionBody(def);
        }
        else {
            this.writeSemiColon();
        }
    }

    private writeSemiColon() {
        this.writer.write(";").newLine();
    }

    private writeFunctionBody(def: NotInterfaceMethod) {
        this.writer.block(() => {
            if (typeof def.onWriteFunctionBody === "function") {
                def.onWriteFunctionBody(this.writer);
            }
        });
    }
}
