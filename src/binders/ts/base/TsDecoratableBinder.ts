import {DecoratorDefinition} from "./../../../definitions";
import {TsNode} from "./../../../compiler";
import {DecoratableBinder} from "./../../base";
import {TsDecoratorBinder} from "./../general";

export class TsDecoratableBinder extends DecoratableBinder {
    constructor(private node: TsNode) {
        super();
    }

    getDecorators() {
        return this.node.getDecorators().map(decoratorNode => {
            const decoratorDef = new DecoratorDefinition();
            const decoratorBinder = new TsDecoratorBinder(decoratorNode);

            decoratorBinder.bind(decoratorDef);

            return decoratorDef;
        });
    }
}
