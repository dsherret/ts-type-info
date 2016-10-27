import {TsNode} from "./../../../compiler";
import {DocumentationedBinder} from "./../../base";

export class TsDocumentationedBinder extends DocumentationedBinder {
    constructor(private readonly node: TsNode) {
        super();
    }

    getDocumentationComment() {
        let text = this.node.getDocumentationComment();

        // "     /*" goes to "/*"
        text = text.replace(/^\s*\/\*\*/, "/**");
        // "     *" goes to " *"
        text = text.replace(/\n\s+\*/g, "\n *");

        return text;
    }
}
