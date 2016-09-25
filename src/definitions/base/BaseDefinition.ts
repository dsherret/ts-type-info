import CodeBlockWriter from "code-block-writer";

export abstract class BaseDefinition {
    private static _uniqueID = 0;
    __uniqueID: number;

    constructor() {
        const mixins = (this.constructor as any)["mixins"] as any[] || [];
        mixins.forEach(mixin => {
            mixin.call(this);
        });

        Object.defineProperty(this, "__uniqueID", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: ++BaseDefinition._uniqueID
        });
    }

    onBeforeWrite: ((writer: CodeBlockWriter) => void) | null;
    onAfterWrite: ((writer: CodeBlockWriter) => void) | null;
}
