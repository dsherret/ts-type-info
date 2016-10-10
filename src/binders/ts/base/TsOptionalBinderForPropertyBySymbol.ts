import {TsSymbol} from "./../../../compiler";
import {OptionalBinder} from "./../../base";

export class TsOptionalBinderForPropertyBySymbol extends OptionalBinder {
    constructor(private readonly symbol: TsSymbol) {
        super();
    }

    getIsOptional() {
        return this.symbol.isPropertyOptional();
    }
}
