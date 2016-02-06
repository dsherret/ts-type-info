import {FunctionWriteableDefinitions, FunctionDefinition, ClassMethodDefinition, ClassStaticMethodDefinition} from "./../definitions";
import {WriteFlags} from "./../write-flags";
import {BaseWriter} from "./base-writer";

export class FunctionBodyWriter extends BaseWriter {
    write(def: FunctionWriteableDefinitions) {
        if (def.isInterfaceMethodDefinition()) {
            this.writeSemiColon();
        }
        else {
            const isOnWriteFunctionBodyDefined = typeof def.onWriteFunctionBody === "function";
            const suggestedToHideFunctionBody = (this.flags & WriteFlags.HideFunctionBodies) || (def as FunctionDefinition).isAmbient;

            if (!isOnWriteFunctionBodyDefined && suggestedToHideFunctionBody) {
                this.writeSemiColon();
            }
            else {
                this.writeFunctionBody(def);
            }
        }
    }

    private writeSemiColon() {
        this.writer.write(";");
    }

    private writeFunctionBody(def: FunctionDefinition | ClassMethodDefinition | ClassStaticMethodDefinition) {
        this.writer.block(() => {
            if (typeof def.onWriteFunctionBody === "function") {
                def.onWriteFunctionBody(this.writer);
            }
        });
    }
}
