import {TsSymbol} from "./../../../compiler";
import {NamedBinder} from "./../../base";

export class TsNamedBinderBySymbol extends NamedBinder {
    constructor(private readonly symbol: TsSymbol) {
        super();
    }

    getName() {
        return this.symbol.getName();
    }
}
