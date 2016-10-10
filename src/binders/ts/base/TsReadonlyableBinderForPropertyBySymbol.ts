import {TsSymbol} from "./../../../compiler";
import {ReadonlyableBinder} from "./../../base";

export class TsReadonlyableBinderForPropertyBySymbol extends ReadonlyableBinder {
    constructor(private readonly symbol: TsSymbol) {
        super();
    }

    getIsReadonly() {
        return this.symbol.isPropertyReadonly();
    }
}
