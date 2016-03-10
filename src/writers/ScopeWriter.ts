import {Scope} from "./../definitions";
import {BaseWriter} from "./BaseWriter";

export class ScopeWriter extends BaseWriter {
    write(scope: Scope) {
        if (scope != null) {
            switch (scope) {
                case Scope.Protected:
                    this.writer.write("protected");
                    break;
                case Scope.Private:
                    this.writer.write("private");
                    break;
                default:
                    break;
            }
        }
    }
}
