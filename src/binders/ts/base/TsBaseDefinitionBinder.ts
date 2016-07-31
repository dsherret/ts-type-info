import {BaseDefinitionBinder} from "./../../base";

export class TsBaseDefinitionBinder extends BaseDefinitionBinder {
    constructor() {
        super();
    }

    getOnBeforeWrite() {
        return null;
    }

    getOnAfterWrite() {
        return null;
    }
}
