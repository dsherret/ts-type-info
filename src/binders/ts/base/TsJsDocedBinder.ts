import {TsNode} from "./../../../compiler";
import {JsDocedBinder} from "./../../base";

export class TsJsDocedBinder extends JsDocedBinder {
    constructor(private readonly node: TsNode) {
        super();
    }

    getJsDocText() {
        return this.node.getJsDocText();
    }
}
