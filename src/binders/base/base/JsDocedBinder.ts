import {JsDocedDefinition} from "./../../../definitions";

export abstract class JsDocedBinder {
    abstract getJsDocText(): string;

    bind(def: JsDocedDefinition) {
        def.jsDocText = this.getJsDocText();
    }
}
