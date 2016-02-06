import {ParameterDefinitions} from "./../definitions";
import {BaseWriter} from "./base-writer";
import {ParameterWriter} from "./parameter-writer";

export class ParametersWriter extends BaseWriter {
    private parameterWriter = new ParameterWriter(this.writer, this.flags);

    write(parameters: ParameterDefinitions[]) {
        this.writer.write("(");
        parameters.forEach((param, i) => {
            if (i !== 0) {
                this.writer.write(", ");
            }

            this.parameterWriter.write(param);
        });
        this.writer.write(")");
    }
}
