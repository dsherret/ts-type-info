import CodeBlockWriter from "code-block-writer";
import {TsFactory} from "./../../../factories";
import {TsNode, TsSymbol} from "./../../../compiler";
import {ClassPropertyBinder} from "./../../base";
import {TsBaseClassPropertyBinder} from "./base";

export class TsClassPropertyBinder extends ClassPropertyBinder {
    private symbol: TsSymbol;

    constructor(factory: TsFactory, private node: TsNode) {
        super(new TsBaseClassPropertyBinder(factory, node));

        this.symbol = node.getSymbol();
    }

    getIsAccessor() {
        return this.symbol.isPropertyAccessor();
    }

    getIsReadonly() {
        return this.symbol.isPropertyReadonly();
    }

    getIsConstructorParameter() {
        // this implementation will never be a constructor parameter
        return false;
    }

    getOnWriteGetBody() {
        return null as (writer: CodeBlockWriter) => void;
    }

    getOnWriteSetBody() {
        return null as (writer: CodeBlockWriter) => void;
    }
}
