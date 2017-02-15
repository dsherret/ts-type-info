import CodeBlockWriter from "code-block-writer";
import {ClassConstructorParameterScope} from "./../definitions";

export class ClassConstructorParameterScopeWriter {
    constructor(private readonly writer: CodeBlockWriter) {
    }

    writeScope(scope: ClassConstructorParameterScope) {
        switch (scope) {
            case ClassConstructorParameterScope.Public:
                this.writer.write("public ");
                break;
            case ClassConstructorParameterScope.Protected:
                this.writer.write("protected ");
                break;
            case ClassConstructorParameterScope.Private:
                this.writer.write("private ");
                break;
            default:
                break;
        }
    }
}
