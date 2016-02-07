import {FunctionWriteableDefinitions, FunctionDefinition, ClassMethodDefinition, ClassStaticMethodDefinition} from "./../definitions";
import {WriteFlags} from "./../write-flags";
import {BaseWriter} from "./base-writer";

type NotInterfaceMethod = FunctionDefinition | ClassMethodDefinition | ClassStaticMethodDefinition;

export class FunctionBodyWriter extends BaseWriter {
    static willWriteFunctionBody(def: FunctionWriteableDefinitions, flags: WriteFlags): def is NotInterfaceMethod {
        if (def.isInterfaceMethodDefinition() || (def.isClassMethodDefinition() && def.isAbstract)) {
            return false;
        }
        else {
            const isOnWriteFunctionBodyDefined = typeof def.onWriteFunctionBody === "function";
            const suggestedToHideFunctionBody = (flags & WriteFlags.HideFunctionBodies) || (def as FunctionDefinition).isAmbient;

            return isOnWriteFunctionBodyDefined || !suggestedToHideFunctionBody;
        }
    }

    write(def: FunctionWriteableDefinitions) {
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
