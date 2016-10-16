import {JsDocedStructure} from "./../../../structures";
import {JsDocedBinder} from "./../../base";

export class StructureJsDocedBinder extends JsDocedBinder {
    constructor(private readonly structure: JsDocedStructure) {
        super();
    }

    getJsDocText() {
        return this.structure.jsDocText || "";
    }
}
