﻿import {StructureFactory} from "./../../../factories";
import {TypeAliasStructure} from "./../../../structures";
import {objectAssign} from "./../../../utils";
import {TypeAliasBinder} from "./../../base";
import {StructureNamedBinder} from "./../base/StructureNamedBinder";
import {StructureExportableBinder} from "./../base/StructureExportableBinder";
import {StructureTypeExpressionedBinder} from "./../base/StructureTypeExpressionedBinder";
import {StructureTypeParameteredBinder} from "./../base/StructureTypeParameteredBinder";
import {StructureAmbientableBinder} from "./../base/StructureAmbientableBinder";

export class StructureTypeAliasBinder extends TypeAliasBinder {
    constructor(private factory: StructureFactory, private structure: TypeAliasStructure) {
        super(
            new StructureNamedBinder(structure),
            new StructureExportableBinder(structure),
            new StructureTypeExpressionedBinder(structure),
            new StructureTypeParameteredBinder(factory, structure),
            new StructureAmbientableBinder(objectAssign(structure, { isAmbient: true }))
        );
    }
}
