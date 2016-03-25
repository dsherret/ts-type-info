import {FunctionBodyWriteableDefinitions, FunctionDefinition, ClassMethodDefinition, ClassStaticMethodDefinition, ClassConstructorDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {BaseWriter} from "./BaseWriter";

type NotInterfaceMethod = FunctionDefinition | ClassMethodDefinition | ClassStaticMethodDefinition | ClassConstructorDefinition;

export class FunctionBodyWriter extends BaseWriter {
    static willWriteFunctionBody(def: FunctionBodyWriteableDefinitions, flags: WriteFlags): def is NotInterfaceMethod {
        if (def.isInterfaceMethodDefinition() || (def.isClassMethodDefinition() && def.isAbstract)) {
            return false;
        }
        else {
            const isOnWriteFunctionBodyDefined = typeof def.onWriteFunctionBody === "function";
            const shouldHideFunctionBodies = (flags & WriteFlags.HideFunctionBodies) !== 0;
            const isAmbient = (def.isFunctionDefinition() && def.isAmbient) || (def.isClassMethodDefinition() && def.parent.isAmbient);
            const suggestedToHideFunctionBody = shouldHideFunctionBodies || isAmbient;

            return isOnWriteFunctionBodyDefined || !suggestedToHideFunctionBody;
        }
    }

    write(def: FunctionBodyWriteableDefinitions) {
        if (FunctionBodyWriter.willWriteFunctionBody(def, this.flags)) {
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
