import {Scope} from "./../definitions";
import {BaseWriter} from "./base-writer";

export class ScopeWriter extends BaseWriter {
    write(scope: Scope) {
        if (scope != null) {
            switch (scope) {
                case Scope.protected:
                    this.writer.write("protected");
                    break;
                case Scope.private:
                    this.writer.write("private");
                    break;
                default:
                    break;
            }
        }
    }
}
