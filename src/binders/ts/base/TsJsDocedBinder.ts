import {TsNode} from "./../../../compiler";
import {JsDocedBinder} from "./../../base";

export class TsJsDocedBinder extends JsDocedBinder {
    constructor(private readonly node: TsNode) {
        super();
    }

    getJsDocText() {
        let text = this.node.getJsDocText();

        // "     /*" goes to "/*"
        text = text.replace(/^\s*\/\*\*/, "/**");
        // "     *" goes to " *"
        text = text.replace(/\n\s+\*/g, "\n *");

        return text;
    }
}
