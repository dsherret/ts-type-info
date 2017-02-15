import CodeBlockWriter from "code-block-writer";
import {Scope} from "./../definitions";

export class ScopeWriter {
    constructor(private readonly writer: CodeBlockWriter) {
    }

    writeScope(scope: Scope) {
        switch (scope) {
            case Scope.Protected:
                this.writer.write("protected ");
                break;
            case Scope.Private:
                this.writer.write("private ");
                break;
            default:
                break;
        }
    }
}
