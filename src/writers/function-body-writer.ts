import {FunctionWriteableDefinitions, FunctionDefinition} from "./../definitions";
import {WriteFlags} from "./../write-flags";
import {BaseWriter} from "./base-writer";

export class FunctionBodyWriter extends BaseWriter {
    writeFunctionBody(def: FunctionWriteableDefinitions) {
        const isOnWriteFunctionBodyDefined = typeof def.onWriteFunctionBody === "function";
        const suggestedToHideFunctionBody = (this.flags & WriteFlags.HideFunctionBodies) || (def as FunctionDefinition).isAmbient;
        const alwaysHideFunctionBody = def.parent.isInterfaceDefinition();

        if (alwaysHideFunctionBody || (!isOnWriteFunctionBodyDefined && suggestedToHideFunctionBody)) {
            this.writer.write(";");
        }
        else {
            this.writer.block(() => {
                if (typeof def.onWriteFunctionBody === "function") {
                    def.onWriteFunctionBody(this.writer);
                }
            });
        }
    }
}
