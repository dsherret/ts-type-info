import {NodedBinder} from "./../../base";

export class TsNodedBinderNull extends NodedBinder {
    constructor() {
        super();
    }

    getTsNode() {
        return undefined;
    }
}
