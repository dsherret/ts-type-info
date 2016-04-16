import {ExpressionDefinition, PropertyDefinitions, DefaultExpressionedDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {StringUtils} from "./../utils";
import {BaseWriter} from "./BaseWriter";

export class ExpressionWriter extends BaseWriter {
    static willWriteDefaultExpression(def: PropertyDefinitions, flags: WriteFlags) {
        // todo: not ideal to do this—seems like type guarding doesn't work with InterfacePropertyDefinition
        const defaultExpressionedDef = def as any as DefaultExpressionedDefinition;
        return ((flags & WriteFlags.HideExpressions) === 0 &&
            defaultExpressionedDef.defaultExpression != null &&
            !StringUtils.isNullOrWhiteSpace(defaultExpressionedDef.defaultExpression.text));
    }

    writeWithEqualsSign(def: ExpressionDefinition) {
        if (def != null) {
            this.writer.write(" = ");
            this.write(def);
        }
    }

    write(def: ExpressionDefinition) {
        if (def != null) {
            this.writer.write(def.text);
        }
    }
}
